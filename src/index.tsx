import '@fortawesome/fontawesome-free/css/all.min.css'
import "react-datetime/css/react-datetime.css";
import './styles/main.css'

import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { library } from '@fortawesome/fontawesome-svg-core'
import { QueryClient, QueryClientProvider } from 'react-query';
import { App } from './App';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Theme } from 'react-daisyui'

library.add(fas)

const container = document.getElementById('root')
const root = createRoot(container!)

const queryClient = new QueryClient({
    defaultOptions: {
    },
})

root.render(
    <QueryClientProvider client={queryClient}>
        <Theme dataTheme="light">
            <App />
        </Theme>
    </QueryClientProvider>
)