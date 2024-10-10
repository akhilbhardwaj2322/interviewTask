
import { useCallback, useState } from 'react';
import { useQueryParam } from 'use-query-params';
import { QueryParamConfig } from 'serialize-query-params';

const useQueryStateParam = <T>(name: string, paramConfig?: QueryParamConfig<T, T> | undefined): [T, (newValue: T | ((newValue: T) => T)) => void] => {
    const [queryParam, setQueryParam] = useQueryParam(name, paramConfig);
    const [state, setState] = useState<T>(queryParam);

    const setter = useCallback((newValue: T | ((value: T) => T)) => {
        setQueryParam(newValue);
        setState(newValue);
    }, [setQueryParam, setState]);
    
    return [state, setter];
};

export default useQueryStateParam;
