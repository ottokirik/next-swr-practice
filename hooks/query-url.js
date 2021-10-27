import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export const useQueryUrl = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(9);

    const router = useRouter();
    const { query } = router;

    useEffect(() => {
        if (query.page) {
            setPage(Number(query.page));
        }

        if (query.limit) {
            setLimit(Number(query.limit) < 9 ? 9 : Number(query.limit));
        }
    }, [query.page, query.limit]);

    return { page, limit };
};

export const useGetQueryUrl = () => {
    const router = useRouter();
    const { query } = router;
    let page = Number(query.page) >= 1 ? Number(query.page) : 1;
    let limit = Number(query.limit) >= 9 ? Number(query.limit) : 9;
    let search = query.search || '';

    return {
        router,
        page,
        limit,
        search,
    };
};
