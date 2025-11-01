'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const RegionFilter = ({
  regions
}: {
  regions: { id: string; name: string }[];
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete('regionId');
    } else {
      params.set('regionId', value);
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      value={searchParams.get('regionId') ?? 'all'}
      onValueChange={handleChange}
    >
      <SelectTrigger aria-label="Filtrer par région">
        <SelectValue placeholder="Toutes les régions" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Toutes les régions</SelectItem>
        {regions.map((region) => (
          <SelectItem key={region.id} value={region.id}>
            {region.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
