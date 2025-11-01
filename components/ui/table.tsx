import { cn } from '@/lib/utils';

export const Table = ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="overflow-hidden rounded-2xl border border-gray-border bg-white shadow-md">
    <table className={cn('min-w-full divide-y divide-gray-border text-sm', className)} {...props} />
  </div>
);

export const THead = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="bg-gray-ui text-xs font-semibold uppercase tracking-wide text-gray-600" {...props} />
);

export const TBody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className="divide-y divide-gray-border" {...props} />
);

export const TR = (props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="hover:bg-green/5" {...props} />
);

export const TH = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn('px-6 py-4 text-left', className)} {...props} />
);

export const TD = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn('px-6 py-5 align-top text-gray-700', className)} {...props} />
);
