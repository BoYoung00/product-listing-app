"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./SearchFilter.module.scss";

const SearchFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 초기 상태 받아오기
  const initialQuery = searchParams.get("q") || "";
  const initialOrder = searchParams.get("order") || "";

  const [query, setQuery] = useState(initialQuery);
  const [order, setOrder] = useState<"asc" | "desc" | "">(
    initialOrder === "asc" || initialOrder === "desc" ? (initialOrder as "asc" | "desc") : "",
  );

  // URL 변경 시 상태 동기화
  useEffect(() => {
    setQuery(initialQuery);
    setOrder(initialOrder === "asc" || initialOrder === "desc" ? (initialOrder as "asc" | "desc") : "");
  }, [initialQuery, initialOrder]);

  // 검색 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (order) {
      params.set("sortBy", "rating");
      params.set("order", order);
    }

    router.push(`?${params.toString()}`);
  };

  // 정렬 클릭
  const handleSortClick = (selectedOrder: "asc" | "desc") => {
    const newOrder = order === selectedOrder ? "" : selectedOrder;
    setOrder(newOrder);

    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (newOrder) {
      params.set("sortBy", "rating");
      params.set("order", newOrder);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        검색
      </button>

      <div className={styles.sortOptions}>
        <span
          className={`${styles.sortOption} ${order === "desc" ? styles.active : ""}`}
          onClick={() => handleSortClick("desc")}
        >
          별점 높은순
        </span>
        <span
          className={`${styles.sortOption} ${order === "asc" ? styles.active : ""}`}
          onClick={() => handleSortClick("asc")}
        >
          별점 낮은순
        </span>
      </div>
    </form>
  );
};

export default SearchFilter;
