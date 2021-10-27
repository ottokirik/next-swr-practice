import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Loading, Error } from '../../components';
import { useUser } from '../../hooks';

const User = ({ initUser, id }) => {
    const [data, setData] = useState(initUser);
    const [isSWR, setIsSWR] = useState(false);

    const { user, isLoading, isError } = useUser(id);

    useEffect(() => {
        if (!user) return;
        setData(user);
        setIsSWR(true);
    }, [user]);

    if (isSWR && isLoading) {
        return <Loading />;
    }

    if (isSWR && isError) {
        return <Error />;
    }

    return (
        <div style={{ height: '85vh' }}>
            <Card user={data} />
        </div>
    );
};

export const getStaticProps = async ({ params }) => {
    const url = `/users/${params.id}`;
    const res = await axios.get(url);

    const initUser = res.data;

    return {
        props: { initUser, id: params.id },
        revalidate: 60,
    };
};

export const getStaticPaths = async () => {
    const url = `/users?_sort=createdAt&_order=desc`;
    const res = await axios.get(url);
    const users = res.data;

    const paths = users.map(({ id }) => ({ params: { id } }));

    return { paths, fallback: 'blocking' };
};

export default User;
