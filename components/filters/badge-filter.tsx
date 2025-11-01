'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export const BadgeFilters = ({
  options,
  param = 'kind'
}: {
  options: { label: string; value: string }[];
  param?: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = searchParams.get(param) ?? 'all';

  const toggle = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete(param);
    } else {
      params.set(param, value);
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          className={cn(
            'rounded-full border border-green px-4 py-2 text-sm font-semibold transition',
            active === option.value
              ? 'bg-green text-white shadow'
              : 'bg-white text-green hover:bg-green/10'
          )}
          onClick={() => toggle(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
