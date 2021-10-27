import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { useQueryUrl } from '../hooks';

export const Header = () => {
    const [search, setSearch] = useState('');

    const { page, limit } = useQueryUrl();

    const router = useRouter();
    const { pathname } = router;

    const handlePagination = (page) => {
        if (page === 0 || pathname !== '/') return;
        router.replace(`?page=${page}&limit=${limit}`);
    };

    const handlePerPage = (limit) => {
        if (pathname !== '/') return;
        router.replace(`?page=${1}&limit=${limit}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (pathname !== '/') return;

        router.replace(`?search=${search}`);
        setSearch('');
    };

    return (
        <header>
            <div className="nav wrap">
                <div className="logo">
                    <h1>
                        {pathname !== '/' ? (
                            <div onClick={() => router.back()} style={{ cursor: 'pointer' }}>
                                SWR
                            </div>
                        ) : (
                            <Link href={`/?page=${1}&limit=${limit}`} replace shallow>
                                <a>SWR</a>
                            </Link>
                        )}
                    </h1>
                </div>

                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        required
                        placeholder="Enter your search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        disabled={pathname !== '/'}
                    />
                    <button type="submit" disabled={pathname !== '/'}>
                        Search
                    </button>
                </form>

                <div className="row">
                    <button
                        disabled={pathname !== '/' || page === 1}
                        className="prev"
                        aria-label="prev"
                        onClick={() => handlePagination(page - 1)}
                    >
                        <i className="fas fa-chevron-left" />
                    </button>
                    <span>{page}</span>
                    <button
                        disabled={pathname !== '/'}
                        className="next"
                        aria-label="next"
                        onClick={() => handlePagination(page + 1)}
                    >
                        <i className="fas fa-chevron-right" />
                    </button>
                </div>

                <div>
                    <label htmlFor="per-page">Per Page:</label>
                    <select
                        disabled={pathname !== '/'}
                        id="per-page"
                        onChange={(e) => handlePerPage(e.target.value)}
                        value={limit}
                    >
                        <option value="9">9</option>
                        <option value="15">15</option>
                        <option value="21">21</option>
                        <option value="30">30</option>
                    </select>
                </div>
            </div>
        </header>
    );
};
