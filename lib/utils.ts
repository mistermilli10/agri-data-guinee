import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (value: number | null | undefined) => {
  if (!value) return '0';
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return '0';
  if (numeric >= 1000) {
    return `${(numeric / 1000).toFixed(1)}K`;
  }
  return numeric.toLocaleString('fr-FR');
};

export const formatCurrency = (value: number | null | undefined) => {
  if (!value) return '0 $';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};
