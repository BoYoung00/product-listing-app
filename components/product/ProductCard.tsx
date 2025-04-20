import React from "react";
import Image from "next/image";
import styles from "./ProductCard.module.scss";
import { Product, ViewType } from "@/types/product";
import { MdOutlineImageNotSupported } from "react-icons/md";

type ProductCardProps = {
  product: Product;
  viewType: ViewType;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, viewType }) => {
  return (
    <div className={`${styles.card} ${styles[viewType]}`}>
      <div className={styles.thumbnailWrapper}>
        {product.thumbnail ? (
          <Image src={product.thumbnail} alt={product.title} className={styles.image} width={300} height={300} />
        ) : (
          <MdOutlineImageNotSupported className={styles.noImageIcon} size={100} />
        )}
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.meta}>
          <span className={styles.rating}>⭐ {product.rating}</span>
          <span className={styles.reviews}>({product.reviews} 리뷰)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
