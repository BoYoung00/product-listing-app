import ProductList from "@/components/product/ProductList";
import SearchFilter from "@/components/product/SearchFilter";
import { getProducts } from "@/lib/api/getProducts";
import { ViewType } from "@/types/product";
import { cookies } from "next/headers";
import styles from "./products.module.scss";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { q?: string; sortBy?: string; order?: "asc" | "desc" };
}) {
  const params = await searchParams;

  const query = params.q || "";
  const sortBy = params.sortBy || "";
  const order = params.order || undefined;

  const cookieStore = await cookies();
  const viewType = cookieStore.get("viewType")?.value as ViewType;

  const initialProducts = await getProducts({
    query,
    sortBy,
    order,
    limit: 20,
    skip: 0,
  });

  return (
    <div className={styles.container}>
      <SearchFilter />
      <ProductList
        initialProducts={initialProducts}
        initialViewType={viewType}
        query={query || ""}
        sortBy={sortBy || ""}
        order={order as "asc" | "desc"}
      />
    </div>
  );
}
