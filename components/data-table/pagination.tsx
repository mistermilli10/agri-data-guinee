'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const DataTablePagination = ({ total, pageSize }: { total: number; pageSize: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = Number(searchParams.get('page') ?? '1');
  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  const goToPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(nextPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between gap-4 pt-6 text-sm text-gray-600">
      <span>
        Page {page} sur {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(Math.max(1, page - 1))}
          disabled={page <= 1}
        >
          Précédent
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
};
