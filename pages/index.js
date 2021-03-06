import axios from 'axios';
import Head from 'next/head';
import { Page, UserInput } from '../components';
import { useGetQueryUrl } from '../hooks';

export default function Home({ initUsers }) {
    const { page, limit, search } = useGetQueryUrl();

    return (
        <div>
            <Head>
                <title>SWR Practice</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="user_input_container">
                    <UserInput />
                </div>
                <Page page={page} limit={limit} search={search} initUsers={initUsers} />
                {/* Простейшая предзагрузка */}
                <div style={{ display: 'none' }}>
                    <Page page={page + 1} limit={limit} search={search} initUsers={initUsers} />
                </div>
            </main>
        </div>
    );
}

export const getStaticProps = async () => {
    const url = `/users?_sort=createdAt&_order=desc`;
    const res = await axios.get(url);

    const initUsers = res.data;
    return {
        props: { initUsers },
        revalidate: 60,
    };
};
