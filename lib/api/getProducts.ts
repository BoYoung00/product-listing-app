import { Product } from "@/types/product";

interface FetchOptions {
  query?: string; // 검색어
  sortBy?: string; // 정렬 기준
  order?: "asc" | "desc"; // 정렬 순서
  limit?: number; // 한 페이지당 아이템 수
  skip?: number; // 몇 개를 건너뛸지 (무한 스크롤용)
}

interface RawProduct {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews?: number[] | number;
}

export async function getProducts({ query: query, sortBy, order, limit = 20, skip = 0 }: FetchOptions) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const params = new URLSearchParams();

  if (query) params.set("q", query);
  if (sortBy) {
    params.set("sortBy", sortBy);
    if (order) params.set("order", order);
  }

  params.set("limit", String(limit));
  params.set("skip", String(skip));

  const url = query ? `${BASE_URL}/search?${params.toString()}` : `${BASE_URL}?${params.toString()}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    console.error("Error fetching products:", res.status);
    return [];
  }

  const data = await res.json();

  return (data.products ?? []).map(
    (product: RawProduct): Product => ({
      id: product.id,
      title: product.title,
      description: product.description,
      thumbnail: product.thumbnail,
      rating: product.rating,
      reviews: Array.isArray(product.reviews) ? product.reviews.length : (product.reviews ?? 0),
    }),
  );
}
