'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ExportButtonProps = {
  href: string;
  disabled?: boolean;
};

export const ExportButton = ({ href, disabled }: ExportButtonProps) => (
  <Button asChild variant="outline" disabled={disabled}>
    <a href={href} className="flex items-center gap-2">
      <Download className="h-4 w-4" /> Exporter
    </a>
  </Button>
);
