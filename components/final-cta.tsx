import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const FinalCta = () => (
  <section className="mx-auto max-w-6xl px-6 py-20">
    <div className="rounded-3xl bg-gradient-to-r from-green to-green-700 px-10 py-12 text-white shadow-lg">
      <h2 className="text-3xl font-bold tracking-tight">
        Rejoignez la Révolution Agricole Numérique
      </h2>
      <p className="mt-3 max-w-2xl text-base text-green-100">
        Connectez votre coopérative, votre entreprise ou votre projet de
        recherche et contribuez à un écosystème agricole durable et innovant.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button asChild size="lg">
          <Link href="/auth/register">Créer un compte</Link>
        </Button>
        <Button variant="outline" size="lg" className="bg-white text-green">
          Télécharger les Données
        </Button>
      </div>
    </div>
  </section>
);
