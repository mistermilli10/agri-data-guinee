import { Leaf, MapPin, Users, Rocket } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

const defaultKpis = [
  {
    label: 'Filières suivies',
    value: 12,
    icon: Leaf
  },
  {
    label: 'Coopératives actives',
    value: 1247,
    icon: Users
  },
  {
    label: 'Volume total (T)',
    value: 89500,
    icon: MapPin
  },
  {
    label: "Projets d'innovation",
    value: 34,
    icon: Rocket
  }
];

export const KpiCards = ({
  data = defaultKpis
}: {
  data?: { label: string; value: number; icon: React.ComponentType<any> }[];
}) => (
  <section className="mx-auto max-w-6xl px-6 py-14">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
      Vue d’Ensemble du Secteur Agricole
    </h2>
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {data.map((kpi) => (
        <article
          key={kpi.label}
          className="rounded-2xl border border-gray-border bg-white p-6 shadow-md"
        >
          <div className="flex items-center justify-between">
            <kpi.icon className="h-10 w-10 text-green" />
            <span className="text-sm font-medium text-green">En temps réel</span>
          </div>
          <p className="mt-6 text-3xl font-bold text-gray-900">
            {formatNumber(kpi.value)}
          </p>
          <p className="mt-2 text-sm text-gray-500">{kpi.label}</p>
        </article>
      ))}
    </div>
  </section>
);
