'use client';

import { FormEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export const SearchInput = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const q = (formData.get('q') as string) ?? '';
    const params = new URLSearchParams(searchParams);
    if (q) {
      params.set('q', q);
    } else {
      params.delete('q');
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full items-center gap-2">
      <Input
        name="q"
        placeholder={placeholder}
        defaultValue={searchParams.get('q') ?? ''}
        aria-label={placeholder}
      />
      <Button type="submit" variant="outline" size="sm">
        <Search className="mr-2 h-4 w-4" /> Rechercher
      </Button>
    </form>
  );
};
