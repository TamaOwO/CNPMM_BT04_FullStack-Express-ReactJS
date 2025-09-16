import { useState, useEffect, useCallback } from 'react';
import { fetchPage } from '../utils/api';
/*
 Single responsibility:
  - useProducts: manage products list, page, loading, hasMore
  - fetchPage: only fetches one page from API
*/



export default function useProducts(initialCategory = 'all', initialLimit = 12) {
  const [category, setCategory] = useState(initialCategory);
  const [limit] = useState(initialLimit);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // reset when category changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [category]);

  const load = useCallback(
    async currentPage => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPage({ category, page: currentPage, limit });
        // append for pages > 1, replace for page=1
        setProducts(prev =>
          currentPage === 1
            ? data.product
            : [...prev, ...data.product.filter(p => !prev.some(item => item._id === p._id))]
        );
        setHasMore(currentPage < (data.totalPages || 1));

        console.log("useProducts fetchPage data: ", data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [category, limit]
  );

  // load whenever page changes
  useEffect(() => {
    load(page);
  }, [page, load]);

  function loadMore() {
    if (!loading && hasMore) {
      setPage(p => p + 1);
    }
  }

  function changeCategory(newCategory) {
    setCategory(newCategory);
  }

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    changeCategory,
    currentCategory: category
  };
}