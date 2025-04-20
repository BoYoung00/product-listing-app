"use client";

import { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.scss";
import { Product, ViewType } from "@/types/product";
import { ClipLoader } from "react-spinners";

interface ProductListProps {
  initialProducts: Product[];
  initialViewType: ViewType;
  query: string;
  sort: string;
}

export default function ProductList({ initialProducts, initialViewType, query, sort }: ProductListProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [viewType, setViewType] = useState<ViewType>(initialViewType);
  const [hasMore, setHasMore] = useState(true);
  const skipRef = useRef(initialProducts.length);

  return (
    <section className={styles.container}>
      {products.length === 0 ? (
        "일치하는 결과가 없습니다."
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
      {!hasMore && <div className={styles.endText}>더 이상 불러올 수 없습니다.</div>}
    </section>
  );
}
