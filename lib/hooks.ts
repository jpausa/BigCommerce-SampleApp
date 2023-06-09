import useSWR from "swr";
import { useSession } from "../context/session";

function fetcher(url: string) {
  return fetch(`${url}`).then((res) => res.json());
}

// Reusable SWR hooks
// https://swr.vercel.app/
export function useProducts() {
  const encodedContext = useSession()?.context;
  // Request is deduped and cached; Can be shared across components
  const { data, error } = useSWR(
    encodedContext ? `/api/products?context=${encodedContext}` : null,
    fetcher
  );

  return {
    summary: data,
    isLoading: !data && !error,
    isError: error,
  };
}

export function useProductList() {
  const encodedContext = useSession()?.context;
  // Use an array to send multiple arguments to fetcher
  const {
    data,
    error,
    mutate: mutateList,
  } = useSWR(
    encodedContext ? [`/api/products/list?context=${encodedContext}`] : null,
    fetcher
  );

  return {
    list: data,
    isLoading: !data && !error,
    isError: error,
    mutateList,
  };
}
