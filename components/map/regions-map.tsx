'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import('react-leaflet').then((mod) => mod.GeoJSON),
  { ssr: false }
);

const regionsFeature = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Guinée' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-15.07, 7.19],
            [-15.07, 12.67],
            [-7.65, 12.67],
            [-7.65, 7.19],
            [-15.07, 7.19]
          ]
        ]
      }
    }
  ]
};

export type RegionStatCard = {
  id: string;
  name: string;
  volume: number;
};

export const RegionsMap = ({ stats }: { stats: RegionStatCard[] }) => {
  const sorted = useMemo(
    () => [...stats].sort((a, b) => b.volume - a.volume),
    [stats]
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <Card className="h-[420px] overflow-hidden">
          <MapContainer
            center={[9.5, -12.5]}
            zoom={6}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GeoJSON
              data={regionsFeature as any}
              style={{ color: '#16A34A', weight: 1, fillOpacity: 0.2 }}
            />
          </MapContainer>
        </Card>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Carte Interactive des Régions
          </h3>
          <p className="mt-3 text-sm text-gray-600">
            Visualisez la répartition des volumes de production par région.
          </p>
          <ul className="mt-6 space-y-4">
            {sorted.map((region) => (
              <li
                key={region.id}
                className="flex items-center justify-between rounded-2xl border border-gray-border bg-white p-4 shadow"
              >
                <div>
                  <p className="font-semibold text-gray-900">{region.name}</p>
                  <p className="text-sm text-gray-500">Volume total</p>
                </div>
                <span className="text-lg font-bold text-green">
                  {region.volume.toLocaleString('fr-FR')} T
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
