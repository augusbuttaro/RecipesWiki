import { useState, useEffect } from 'react'

function useFetchData(searchQuery = '', id = '') {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

        const fetchData = async () => {
            setLoading(true);
            try {
                let url;
            if (id) {
                url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`;
            } else if (searchQuery) {
                url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`;
            } else {
                return;
            }                
                const response = await fetch(url);
                const result = await response.json();
                setData(result.meals);
                setError(null);
            } catch (error) {
                setError(error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        useEffect(() => {
            fetchData();
        }, [searchQuery, id]);
    return {data, loading, error, fetchData }
}
export default useFetchData
