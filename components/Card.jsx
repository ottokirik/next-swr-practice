import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../store';
import { useGetQueryUrl, useUsers } from '../hooks';
import axios from 'axios';

export const Card = ({ user }) => {
    const { setUser } = useContext(UserContext);
    const { router, page, limit, search } = useGetQueryUrl();
    const { users, mutate } = useUsers({ page, limit, search });

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure delete?')) {
            const newUsers = users.filter((item) => item.id !== id);

            mutate(newUsers, false);

            await axios.delete(`/users/${id}`);
            mutate();
        }
    };

    return (
        <div className="card">
            <Link href={`/users/${user?.id}`}>
                <a>
                    <h2>{user?.name}</h2>
                    <Image
                        src={user?.avatar}
                        alt="avatar"
                        layout="responsive"
                        width={600}
                        height={600}
                    />
                </a>
            </Link>
            {router.pathname === '/' && (
                <div className="menu">
                    <i className="fas fa-pencil-alt" onClick={() => setUser(user)} />
                    <i className="fas fa-trash" onClick={() => handleDelete(user.id)} />
                </div>
            )}
        </div>
    );
};
