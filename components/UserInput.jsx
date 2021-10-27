import axios from 'axios';
import { useContext } from 'react';
import { useGetQueryUrl, useUsers } from '../hooks';
import { initUserState, UserContext } from '../store';

export const UserInput = () => {
    const { user, setUser } = useContext(UserContext);

    const { id, name, avatar, createdAt } = user;
    const { limit, router, search, page } = useGetQueryUrl();
    const { mutate } = useUsers({ limit, page, search });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            name: name,
            avatar,
            createdAt: id ? createdAt : new Date(),
        };

        if (id) {
            await axios.patch(`/users/${id}`, newUser);
        } else {
            await axios.post('/users', newUser);
        }

        mutate();
        setUser(initUserState);

        router.replace(`/?page=1&limit=${limit}`);
    };

    return (
        <form className="user_input wrap" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" required value={name} onChange={handleInput} />
            </div>

            <div className="input-group">
                <label htmlFor="avatar">Avatar</label>
                <input type="text" name="avatar" required value={avatar} onChange={handleInput} />
            </div>

            <button type="submit">{id ? 'Update' : 'Add'}</button>
        </form>
    );
};
