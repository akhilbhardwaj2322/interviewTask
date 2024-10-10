import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useToPage = (url?: string) => {
    const navigate = useNavigate();

    return useCallback(async (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement| HTMLButtonElement>) => {
        event.preventDefault();
        url = event.currentTarget.getAttribute('href') ?? event.currentTarget.dataset.href ?? url;

        if (!url) return false;

        if (
            (navigator.platform.startsWith('Mac') && event.metaKey && event.button === 0) ||
            (navigator.platform === 'Win32' && event.ctrlKey && event.button === 0) ||
            event.button === 1
        ) {
            window.open(url, '_blank');
            return false;
        }

        if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/api/')) {
            window.location.href = url;
            return false;
        }

        navigate(url);
        return false;
    }, [url, navigate]);
};

export default useToPage;
