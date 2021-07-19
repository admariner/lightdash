import React, { FC, useContext, createContext } from 'react';
import { ApiError, ApiHealthResults, HealthState, LightdashUser } from 'common';
import { useQuery } from 'react-query';
import { UseQueryResult } from 'react-query/types/react/types';
import { lightdashApi } from '../api';

const getHealthState = async () =>
    lightdashApi<ApiHealthResults>({
        url: `/health`,
        method: 'GET',
        body: undefined,
    });

const getUserState = async () =>
    lightdashApi<LightdashUser>({
        url: `/user`,
        method: 'GET',
        body: undefined,
    });

interface AppContext {
    health: UseQueryResult<HealthState, ApiError>;
    user: UseQueryResult<LightdashUser, ApiError>;
}

const Context = createContext<AppContext>(undefined as any);

export const AppProvider: FC = ({ children }) => {
    const health = useQuery<HealthState, ApiError>({
        queryKey: 'health',
        queryFn: getHealthState,
    });
    const user = useQuery<LightdashUser, ApiError>({
        queryKey: 'user',
        queryFn: getUserState,
        enabled: !!health.data?.isAuthenticated,
        retry: false,
    });

    const value = {
        health,
        user,
    };
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function useApp(): AppContext {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useApp must be used within a AppProvider');
    }
    return context;
}
