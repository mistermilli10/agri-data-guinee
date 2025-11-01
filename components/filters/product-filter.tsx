'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const ProductFilter = ({
  products
}: {
  products: string[];
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete('product');
    } else {
      params.set('product', value);
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={searchParams.get('product') ?? 'all'} onValueChange={handleChange}>
      <SelectTrigger aria-label="Filtrer par produit">
        <SelectValue placeholder="Tous les produits" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tous les produits</SelectItem>
        {products
          .filter(Boolean)
          .map((product) => (
            <SelectItem key={product} value={product}>
              {product}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
