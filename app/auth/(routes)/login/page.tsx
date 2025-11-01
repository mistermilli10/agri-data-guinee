import { Metadata } from 'next';
import { AuthTabs } from '@/components/auth/auth-tabs';

export const metadata: Metadata = {
  title: 'Connexion — AgriData Guinée'
};

export default function LoginPage() {
  return (
    <div className="bg-white">
      <section className="bg-green/10 py-20">
        <div className="mx-auto max-w-2xl px-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bon retour !</h1>
          <p className="mt-2 text-sm text-gray-600">
            Connectez-vous pour accéder aux tableaux de bord, soumettre vos projets et suivre vos contributions.
          </p>
          <div className="mt-8">
            <AuthTabs defaultValue="login" />
          </div>
        </div>
      </section>
    </div>
  );
}
