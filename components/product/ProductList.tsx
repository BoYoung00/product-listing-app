"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.scss";
import { Product, ViewType } from "@/types/product";
import { ClipLoader } from "react-spinners";
import { getProducts } from "@/lib/api/getProducts";

interface ProductListProps {
  initialProducts: Product[];
  initialViewType: ViewType;
  query: string;
  sortBy: string;
  order: "asc" | "desc";
}

export default function ProductList({ initialProducts, initialViewType, query, sortBy, order }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [viewType] = useState<ViewType>(initialViewType);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const skipRef = useRef(initialProducts.length);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    const newItems = await getProducts({
      query,
      sortBy,
      order,
      limit: 20,
      skip: skipRef.current,
    });

    if (newItems.length === 0) {
      setHasMore(false);
    } else {
      setProducts((prev) => [...prev, ...newItems]);
      skipRef.current += newItems.length;
    }

    setIsLoading(false);
  }, [query, sortBy, order, isLoading, hasMore]);

  // 쿼리나 정렬 바뀔 때 초기화
  useEffect(() => {
    const fetchInitial = async () => {
      setIsLoading(true);
      skipRef.current = 0;

      const newItems = await getProducts({
        query,
        sortBy,
        order,
        limit: 20,
        skip: 0,
      });

      setProducts(newItems);
      skipRef.current = newItems.length;
      setHasMore(newItems.length > 0);
      setIsLoading(false);
    };

    fetchInitial();
  }, [query, sortBy, order]);

  // IntersectionObserver 등록
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [loadMore, isLoading, hasMore]);

  return (
    <section className={styles.container}>
      {products.length === 0 ? (
        <div className={styles.message}>일치하는 결과가 없습니다.</div>
      ) : (
        <ul className={viewType === "grid" ? styles.grid : styles.list}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} viewType={viewType} />
          ))}
        </ul>
      )}

      {isLoading && (
        <div className={styles.loadingWrapper}>
          <ClipLoader color="#3b82f6" loading={isLoading} size={60} />
        </div>
      )}

      {!isLoading && hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}

      {!hasMore && <div className={styles.message}>더 이상 불러올 수 없습니다.</div>}
    </section>
  );
}
