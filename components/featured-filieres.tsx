import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const featured = [
  {
    id: 'mangue',
    title: 'Mangue de Kindia',
    status: 'Production',
    description:
      'Un réseau de coopératives modernise la chaîne logistique des mangues destinées à l’export.',
    image:
      'https://images.unsplash.com/photo-1615484477201-705c06e7225e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'riz',
    title: 'Riz local de Kankan',
    status: 'Transformation',
    description:
      'Les unités de transformation valorisent le riz pluvial pour réduire les importations.',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'moringa',
    title: 'Moringa de Faranah',
    status: 'Innovation',
    description:
      'Des startups locales développent des compléments nutritionnels à base de moringa.',
    image:
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80'
  }
];

export const FeaturedFilieres = () => (
  <section className="mx-auto max-w-6xl px-6 py-14">
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Filières Phares
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Une sélection de filières emblématiques illustrant le potentiel
          agricole du pays.
        </p>
      </div>
      <Button variant="ghost" asChild>
        <Link href="/filieres">Voir toutes les filières</Link>
      </Button>
    </div>
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {featured.map((filiere) => (
        <Card key={filiere.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <Image
              src={filiere.image}
              alt={filiere.title}
              width={400}
              height={240}
              className="h-48 w-full object-cover"
            />
          </CardHeader>
          <CardContent className="p-6">
            <Badge variant="success" className="mb-4">
              {filiere.status}
            </Badge>
            <h3 className="text-lg font-semibold text-gray-900">
              {filiere.title}
            </h3>
            <p className="mt-3 text-sm text-gray-600">{filiere.description}</p>
            <Button variant="ghost" className="mt-4 px-0" asChild>
              <Link href="/filieres">Voir les détails</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);
