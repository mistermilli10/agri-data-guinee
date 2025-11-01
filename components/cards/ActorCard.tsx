import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MapPin, Users } from 'lucide-react';

const typeColors: Record<string, string> = {
  COOPERATIVE: 'bg-green/10 text-green',
  TRANSFORMATEUR: 'bg-blue/10 text-blue',
  STARTUP: 'bg-yellow/10 text-yellow',
  ONG: 'bg-red/10 text-red',
  ASSOCIATION: 'bg-green/10 text-green',
  INSTITUTION: 'bg-blue/10 text-blue'
};

export const ActorCard = ({
  actor
}: {
  actor: {
    id: string;
    name: string;
    type: string;
    region?: { name: string | null } | null;
    members?: number | null;
    status?: string | null;
    contactName?: string | null;
  };
}) => (
  <Card className="h-full overflow-hidden">
    <CardHeader className="flex flex-col gap-3 p-6">
      <Badge className={typeColors[actor.type] ?? 'bg-green/10 text-green'} variant="success">
        {actor.type === 'COOPERATIVE' && 'Coopérative'}
        {actor.type === 'TRANSFORMATEUR' && 'Transformateur'}
        {actor.type === 'STARTUP' && 'Startup'}
        {actor.type === 'ONG' && 'ONG'}
        {actor.type === 'ASSOCIATION' && 'Association'}
        {actor.type === 'INSTITUTION' && 'Institution'}
      </Badge>
      <h3 className="text-lg font-semibold text-gray-900">{actor.name}</h3>
      {actor.status && (
        <p className="text-xs uppercase tracking-wide text-green">
          {actor.status}
        </p>
      )}
    </CardHeader>
    <CardContent className="space-y-3">
      <p className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin className="h-4 w-4 text-green" />
        {actor.region?.name ?? 'Non renseigné'}
      </p>
      {actor.members ? (
        <p className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4 text-green" />
          {actor.members} membres
        </p>
      ) : null}
      {actor.contactName ? (
        <p className="text-sm text-gray-600">Contact : {actor.contactName}</p>
      ) : null}
      <button className="mt-4 text-sm font-semibold text-green">
        Voir les détails
      </button>
    </CardContent>
  </Card>
);
