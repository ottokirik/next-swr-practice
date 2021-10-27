import useSWR from 'swr';

export const useUsers = ({ page, limit, search }) => {
    let pageQuery = '';
    let searchQuery = '';

    if (page && limit) {
        pageQuery = `&_page=${page}&_limit=${limit}`;
    }

    if (search !== '') {
        searchQuery = `&q=${search}`;
    }

    const { data, error, mutate } = useSWR(
        `/users?_sort=createdAt&_order=desc${pageQuery}${searchQuery}`
    );

    return {
        users: data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};

export const useUser = (id) => {
    const { data, error } = useSWR(id ? `/users/${id}` : null);

    return {
        user: data,
        isLoading: !error && !data,
        isError: error,
    };
};
