import { cn } from '@/lib/utils';

const variants: Record<string, string> = {
  default: 'bg-gray-ui text-gray-700',
  success: 'bg-green/10 text-green',
  warning: 'bg-yellow/10 text-yellow',
  danger: 'bg-red/10 text-red',
  info: 'bg-blue/10 text-blue'
};

export const Badge = ({
  variant = 'default',
  className,
  children
}: {
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
}) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
      variants[variant],
      className
    )}
  >
    {children}
  </span>
);
