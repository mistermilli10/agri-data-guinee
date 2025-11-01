import { Metadata } from 'next';
import { AuthTabs } from '@/components/auth/auth-tabs';

export const metadata: Metadata = {
  title: 'Inscription — AgriData Guinée'
};

export default function RegisterPage() {
  return (
    <div className="bg-white">
      <section className="bg-green/10 py-20">
        <div className="mx-auto max-w-2xl px-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Rejoignez AgriData Guinée</h1>
          <p className="mt-2 text-sm text-gray-600">
            Créez un compte pour soumettre vos initiatives, partager vos données et accéder à des ressources premium.
          </p>
          <div className="mt-8">
            <AuthTabs defaultValue="register" />
          </div>
        </div>
      </section>
    </div>
  );
}
