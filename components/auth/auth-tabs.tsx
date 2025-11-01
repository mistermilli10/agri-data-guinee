'use client';

import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

export const AuthTabs = ({ defaultValue }: { defaultValue: 'login' | 'register' }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>, mode: 'login' | 'register') => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    await fetch(`/api/auth/${mode}`, {
      method: 'POST',
      body: formData
    }).catch(() => undefined);
    setLoading(false);
    router.push('/');
  };

  return (
    <Tabs value={defaultValue} className="w-full" onValueChange={(value) => router.push(`/auth/${value}`)}>
      <TabsList>
        <TabsTrigger value="login">Connexion</TabsTrigger>
        <TabsTrigger value="register">Inscription</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <form className="space-y-4" onSubmit={(event) => onSubmit(event, 'login')}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <Input id="email" name="email" type="email" placeholder="vous@example.com" required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">
              Mot de passe
            </label>
            <Input id="password" name="password" type="password" placeholder="********" required />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <Checkbox name="remember" /> Se souvenir de moi
            </label>
            <a className="font-medium text-green" href="#">
              Mot de passe oublié ?
            </a>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </Button>
          <div className="space-y-3 pt-3">
            <Button type="button" variant="outline" className="w-full">
              Continuer avec Google
            </Button>
            <Button type="button" variant="outline" className="w-full">
              Continuer avec Microsoft
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            En vous connectant, vous acceptez notre politique de confidentialité et nos conditions d’utilisation.
          </p>
        </form>
      </TabsContent>
      <TabsContent value="register">
        <form className="space-y-4" onSubmit={(event) => onSubmit(event, 'register')}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="email-register">
              Email
            </label>
            <Input id="email-register" name="email" type="email" placeholder="vous@example.com" required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="password-register">
              Mot de passe
            </label>
            <Input id="password-register" name="password" type="password" placeholder="********" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Création…' : 'Créer un compte'}
          </Button>
          <div className="space-y-3 pt-3">
            <Button type="button" variant="outline" className="w-full">
              S’inscrire avec Google
            </Button>
            <Button type="button" variant="outline" className="w-full">
              S’inscrire avec Microsoft
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            En poursuivant, vous acceptez notre politique de confidentialité et nos conditions d’utilisation.
          </p>
        </form>
      </TabsContent>
    </Tabs>
  );
};
