import { QueryClient, useMutation, useQuery, useQueryClient, QueryKey } from 'react-query';
import {
    sendRequest,
    appendQueryParams,
    sendListRequest,
} from 'utils/request';

export const queryClient = new QueryClient();

export type GetUsersParams = {
    name?: string;
    email?: string;
    organizationId?: string;
}

export class User {
    id?: string = undefined;
    name: string = "";
    email: string = "";
    organizationId: string = "";

    constructor(init?: Partial<User>) {
        if (!init) {
            return
        }

        Object.assign(this, init)
    }
}

export const useGetUser = createUseQuery('users', async (id: string) => {
    const reply = await sendRequest<Partial<User>>(`/api/users/${id}`);
    return new User(reply);
});

export const useGetUsers = createUseQuery('users', async (params?: GetUsersParams, offset = 0, limit = 50) => {
    let url = appendQueryParams(`/api/users`, {
        ...params,
        offset,
        limit,
    });
    const [reply, total] = await sendListRequest<Partial<User>>(url);
    return {
        data: reply.map(d => new User(d)),
        total,
    };
});

export const useChangePassword = () => {
    return useMutation<void, { code: string, description: string }[], { oldPassword: string, newPassword: string }>(
        async ({ oldPassword, newPassword }) => {
            await sendRequest(
                `/api/users/change-password`,
                'POST',
                'json',
                {
                    oldPassword,
                    newPassword,
                }
            );
        }
    );
}

function createUseQuery<Params extends any[], Result>(queryKey: QueryKey, func: (...params: Params) => Promise<Result>) {
    const query = (...params: Params) => {
        return useQuery<Result>([queryKey, ...params], () => func(...params));
    }
    query.func = () => {
        const queryClient = useQueryClient();
        return (...params: Params) => {
            return queryClient.fetchQuery<Result>([queryKey, ...params], () => func(...params));
        };
    }
    return query;
}