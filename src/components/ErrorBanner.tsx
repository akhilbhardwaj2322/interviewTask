import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

const ErrorBanner = ({ message, className }: { message: string | Error | null | undefined | FieldErrors, className?: string }) => message ? (
    <div className={twMerge("bg-red-100 border border-red-400 text-red-700 mt-4 px-4 py-3 rounded relative whitespace-pre mb-8", className)} 
        role="alert">{message.toString()}</div>
): null;

export default ErrorBanner;
