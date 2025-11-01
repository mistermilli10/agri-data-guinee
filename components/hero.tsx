import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Hero = () => (
  <section className="bg-gray-ui">
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2">
      <div>
        <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-green shadow">
          Plateforme nationale des données agricoles
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Connecter la Terre, les Acteurs et la Technologie
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          Centralisez les informations clés des filières, acteurs et projets
          innovants pour accélérer la transition numérique de l'agriculture
          guinéenne.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="/filieres">Explorer les Données</Link>
          </Button>
          <Button variant="outline" size="lg">
            Voir la Vidéo
          </Button>
        </div>
      </div>
      <div className="relative rounded-2xl bg-white p-6 shadow-lg">
        <Image
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"
          alt="Producteurs agricoles en Guinée"
          width={560}
          height={420}
          className="rounded-xl object-cover"
        />
      </div>
    </div>
  </section>
);
