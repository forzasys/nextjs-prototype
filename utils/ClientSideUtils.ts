'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export const useUpdateSearchParam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (param: string, value?: string | number | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === undefined) {
      params.delete(param);
    } else {
      params.set(param, String(value));
    }

    router.push(`?${params.toString()}`);
  };

  return updateParam;
};