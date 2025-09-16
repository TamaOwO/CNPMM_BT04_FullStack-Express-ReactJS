import React, { useRef, useEffect } from 'react';
import useProducts from '../hook/useProducts';
import ProductList from '../components/productList';
import ProductSearch from '../components/productSearch';
import {searchProductsApi} from '../utils/api';
import { useState } from 'react';


export default function AllProducts() {
  const { products, loading, error, hasMore, loadMore, changeCategory, currentCategory } = useProducts('all', 16);

  const loaderRef = useRef(null);

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);


  useEffect(() => {

    if(isSearching) return; // don't observe when searching

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { root: null, rootMargin: '200px', threshold: 0.1 }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [hasMore, loading, loadMore, isSearching]);

  const handleSearch = async (criteria) => {
    setIsSearching(true);
    try {
      const query = await searchProductsApi(criteria);
      setSearchResults(query);
      } catch (err) {
      console.error("Search error", err);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <h2>Tất cả sản phẩm</h2>
      
      <ProductSearch onSearch={handleSearch} />

      {!isSearching && (
        <div style={{ marginBottom: 16 }}>
          <button
            onClick={() => changeCategory("all")}
            disabled={currentCategory === "all"}
          >
            Tất cả
          </button>
        </div>
      )}

      {/* Hiển thị kết quả search nếu có */}
      {isSearching ? (
        <ProductList products={searchResults} />
      ) : (
        <>
      <ProductList products={products} />
        {/* loader sentinel */}
        <div ref={loaderRef} style={{ height: 1 }} />

        {loading && <div>Loading...</div>}
        {error && <div>Có lỗi xảy ra</div>}
        {!hasMore && <div>Đã tải hết sản phẩm</div>}
      </>
      )}
    </div>
  );
}