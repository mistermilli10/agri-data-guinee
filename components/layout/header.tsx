'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet';

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/filieres', label: 'Filières' },
  { href: '/acteurs', label: 'Acteurs' },
  { href: '/projets', label: 'Projets' }
];

export const Header = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const [role, setRole] = useState<'admin' | 'user' | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const match = document.cookie.match(/agridata-role=(admin|user)/);
    if (match) {
      setRole(match[1] as 'admin' | 'user');
    }
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-border bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-green">
          <span className="h-10 w-10 rounded-full bg-green text-white grid place-items-center font-bold">
            AG
          </span>
          <div className="flex flex-col">
            <span>AgriData Guinée</span>
            <span className="text-xs text-gray-500">
              Ministère de l'Agriculture et de l'Élevage de Guinée
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'rounded-full px-4 py-2 transition-colors hover:bg-green/10',
                isActive(href) && 'bg-green/10 text-green'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {role ? (
            <>
              {role === 'admin' ? (
                <Button variant="ghost" asChild>
                  <Link href="/admin">Tableau de bord</Link>
                </Button>
              ) : null}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green/10 text-sm font-semibold text-green">
                {role === 'admin' ? 'AD' : 'US'}
              </div>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Connexion</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Créer un compte</Link>
              </Button>
            </>
          )}
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Ouvrir le menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="mt-6 flex flex-col gap-2">
                {navItems.map(({ href, label }) => (
                  <SheetClose asChild key={href}>
                    <Link
                      href={href}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-green/10',
                        isActive(href) && 'bg-green/10 text-green'
                      )}
                    >
                      {label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-3">
                {role ? (
                  <>
                    {role === 'admin' ? (
                      <Button variant="ghost" asChild>
                        <Link href="/admin" className="justify-start gap-2">
                          <User className="h-4 w-4" /> Tableau de bord
                        </Link>
                      </Button>
                    ) : null}
                    <div className="flex items-center gap-3 rounded-full bg-green/10 px-3 py-2 text-sm font-semibold text-green">
                      <User className="h-4 w-4" />
                      {role === 'admin' ? 'Administrateur' : 'Utilisateur' }
                    </div>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild>
                      <Link href="/auth/login" className="justify-start gap-2">
                        <User className="h-4 w-4" /> Connexion
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/auth/register">Créer un compte</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
