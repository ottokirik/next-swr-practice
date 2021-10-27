import axios from 'axios';
import Head from 'next/head';
import { SWRConfig } from 'swr';

import { Header } from '../components';
import { UserProvider } from '../store';

import '../styles/globals.css';

axios.defaults.baseURL = 'http://localhost:5000';

function MyApp({ Component, pageProps }) {
    return (
        <SWRConfig
            value={{
                fetcher: (url) => axios.get(url).then((res) => res.data),
                dedupingInterval: 10000,
            }}
        >
            <UserProvider>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
                        integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                    />
                </Head>
                <Header />
                <Component {...pageProps} />
            </UserProvider>
        </SWRConfig>
    );
}

export default MyApp;
