import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { debounce, isEmpty } from "lodash";

export default function useSetQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateQueryParams = useCallback(
    debounce((params: SearchParamsType) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());
      for (const [key, value] of Object.entries(params)) {
        if (isEmpty(value) && typeof value !== "number") {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }
      router.push(`${pathname}?${newSearchParams}`, { scroll: false });
    }, 500),
    [router, searchParams, pathname]
  );

  return updateQueryParams;
}
