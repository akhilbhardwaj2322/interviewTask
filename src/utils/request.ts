export const sendRequest = async <T = any> (url: string, method: HTTPMethod = 'GET', type: RequestType = 'json', body?: any) : Promise<T> => {
    const reply = await makeRequest(url, method, type, body);
    return await reply.json();
}

export const sendListRequest = async <T = any> (url: string) : Promise<[T[], number]> => {
    const reply = await makeRequest(url, 'GET');
    return [await reply.json(), reply.headers.get('X-Total-Count') ? parseInt(reply.headers.get('X-Total-Count')!) : 0];
}

export function appendQueryParams(url: string, params?: {[key: string]: string|number|Date|boolean|null|undefined}) {
    if (params == null || params == undefined) return url;

    for (const key in params) {
        url = addOptionalQueryParam(url, key, params[key]);
    }
    
    return url;
}

export function addOptionalQueryParam(oldUrl: string, queryParamName: string, queryParamValue: string|number|Date|boolean|null|undefined) {
    if (queryParamValue === null || queryParamValue === undefined) {
        return oldUrl;
    }

    if (queryParamValue instanceof Date) {
        queryParamValue = queryParamValue.toISOString();
    }

    const delimiter = oldUrl.indexOf('?') >= 0 ? '&' : '?';
    return oldUrl + delimiter + queryParamName + '=' + encodeURIComponent(queryParamValue);
}

export declare type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export declare type RequestType = "json" | "form";

const makeRequest = async (url: string, method: HTTPMethod, body?: any, type: RequestType = "json") => {
    const request = initRequest(method, type, body);
    const reply = await fetch(url, request)

    if (reply.ok) return reply;

    if (reply.body) {
        const text = await reply.text();
        throw tryParseErrorJson(text) || text;
    } else {
        console.error("Something went wrong", reply);
        throw `Something went wrong`;
    }
};

const initRequest = (method: HTTPMethod, type: RequestType, body?: any) => ({
    method: method,
    credentials: "include",

    ...(type === "json" && {
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        } as HeadersInit,
    }),

    ...(type === "form" && {
        body: initFormData(body),
        // default Content-Type is multipart/form-data
        // and it will calculate the mandatory boundary automatically
    }),
}) as RequestInit;

const tryParseErrorJson = (text: string) => {
    const json = tryParseJson(text);
    if (!json) return null;
    return [
        json.title,
        ...Object.keys(json.errors ?? {}).map((key: string) => key ? `${key}: ${json.errors[key]}`: json.errors[key]),
    ].join('\n');
}

const tryParseJson = (text: string) => {
    try {
        return JSON.parse(text);
    } catch {
        return null;
    }
};

const initFormData = (body: any) => {
    const formData = new FormData();
    for (const key in body) {
        if (body[key] instanceof Array) {
            for (const item of body[key]) {
                appendFormData(formData, key, item);
            }
        } else {
            appendFormData(formData, key, body[key]);
        }
    }
    return formData;
};

const appendFormData = (formData: FormData, key: string, value: any) => {
    if (value instanceof File) {
        console.log(key, value instanceof File, value.name);
        formData.append(key, value, value.name);
    } else {
        formData.append(key, value);
    }
}
