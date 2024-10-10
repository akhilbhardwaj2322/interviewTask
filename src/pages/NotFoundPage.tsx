import React from 'react';
import useToPage from 'web/hooks/useToPage';

const NotFoundPage = () => {
    const toPage = useToPage();
    
    return (
        <div className='w-full h-full grow flex flex-col justify-center items-center'>
            <h1>404 Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p>
                <a href="/" onClick={toPage} onAuxClick={toPage} className='text-blue-600 opacity-75 hover:opacity-100 focused:opacity-100 active:opacity-100'>
                    Go back to home page
                </a>
            </p>
        </div>
    )
}

export default NotFoundPage;
