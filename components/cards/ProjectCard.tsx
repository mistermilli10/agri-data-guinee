import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

export type ProjectCardProps = {
  project: {
    id: string;
    title: string;
    kind: string;
    status: string;
    summary?: string | null;
    budgetUSD?: number | null;
    progress?: number | null;
  };
};

const statusColors: Record<string, string> = {
  PLANNED: 'bg-yellow/10 text-yellow',
  ACTIVE: 'bg-green/10 text-green',
  COMPLETED: 'bg-blue/10 text-blue'
};

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <Card className="h-full">
    <CardHeader className="flex flex-col gap-3 p-6">
      <Badge className={statusColors[project.status] ?? 'bg-green/10 text-green'}>
        {project.status === 'PLANNED' && 'Planifié'}
        {project.status === 'ACTIVE' && 'En cours'}
        {project.status === 'COMPLETED' && 'Terminé'}
      </Badge>
      <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
      {project.summary && (
        <p className="text-sm text-gray-600">{project.summary}</p>
      )}
    </CardHeader>
    <CardContent className="space-y-2">
      {project.budgetUSD ? (
        <p className="text-sm text-gray-600">
          Budget : {formatCurrency(project.budgetUSD)}
        </p>
      ) : null}
      {typeof project.progress === 'number' ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-gray-600">
            <span>Progression</span>
            <span>{project.progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-ui">
            <div
              className="h-2 rounded-full bg-green"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      ) : null}
      <button className="mt-4 text-sm font-semibold text-green">
        Voir les détails
      </button>
    </CardContent>
  </Card>
);
