import { useEffect, useState } from 'react';
import { Loading, Card, Error } from '.';
import { useUsers } from '../hooks';

export const Page = ({ page, limit, search, initUsers = [] }) => {
    const [data, setData] = useState(initUsers);
    const [isSWR, setIsSWR] = useState(false);

    const { users, isLoading, isError } = useUsers({ page, limit, search });

    useEffect(() => {
        if (!users) return;
        setData(users);
        setIsSWR(true);
    }, [users]);

    if (isSWR && isLoading) {
        return <Loading />;
    }

    if (isSWR && isError) {
        return <Error />;
    }

    return (
        <div className="card_container">
            {data?.map((user) => (
                <Card key={user.id} user={user} />
            ))}
        </div>
    );
};
