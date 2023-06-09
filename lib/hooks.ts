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
    isError: error,
  };
}
