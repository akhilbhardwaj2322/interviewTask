import { create } from 'zustand';

export const useErrorAlert = create<{
    errorAlert: string | null,
    setErrorAlert: SetErrorAlert,
}>()((set) => ({
    errorAlert: null,
    setErrorAlert(error) {
        return set(() => ({
            errorAlert: error instanceof Error ? error.message : error,
        }));
    },
}));

export type SetErrorAlert = (error: Error | string | null) => void;
