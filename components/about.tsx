import { Leaf, Sparkles, Network } from 'lucide-react';

const items = [
  {
    title: 'Centralisation des données',
    icon: Leaf,
    description:
      'Agrégation des statistiques agricoles, des projets et des acteurs sur une plateforme unique.'
  },
  {
    title: 'Transparence accrue',
    icon: Network,
    description:
      "Partage d'indicateurs fiables pour orienter les décisions publiques et privées."
  },
  {
    title: 'Innovation collaborative',
    icon: Sparkles,
    description:
      'Stimuler les partenariats entre coopératives, startups, chercheurs et institutions.'
  }
];

export const About = () => (
  <section className="mx-auto max-w-6xl px-6 py-14">
    <div className="rounded-3xl bg-gradient-to-r from-green to-green-600 p-10 text-white shadow-lg">
      <h2 className="text-3xl font-bold tracking-tight">
        À Propos d’AgriData Guinée
      </h2>
      <p className="mt-4 max-w-2xl text-base text-green-50">
        La plateforme accompagne la transformation numérique du secteur agricole
        guinéen en fournissant des données fiables, des outils d’analyse et un
        espace collaboratif pour les acteurs publics et privés.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl bg-white/10 p-6">
            <item.icon className="h-8 w-8 text-yellow" />
            <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-green-50">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
