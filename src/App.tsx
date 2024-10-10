import * as React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import * as Sentry from "@sentry/react";
import { Layout } from 'web/Layout'
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

export const App = () => {
    const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

    return  (
        <BrowserRouter>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
                <SentryRoutes>
                    <Route path="/" element={<Layout />}>
                        <Route path="" element={<Navigate to={"login"} replace />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="signup" element={<SignupPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>
                </SentryRoutes>
            </QueryParamProvider>
        </BrowserRouter>
    );
};
