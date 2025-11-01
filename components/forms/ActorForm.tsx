'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { actorCreateSchema } from '@/lib/validators';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const schema = actorCreateSchema.extend({
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

export const ActorForm = ({
  regions,
  onSubmit
}: {
  regions: { id: string; name: string }[];
  onSubmit: (values: FormValues) => Promise<void>;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'COOPERATIVE'
    }
  });
  const [loading, setLoading] = useState(false);

  const submit = async (values: FormValues) => {
    setLoading(true);
    try {
      await onSubmit(values);
      toast.success('Acteur ajouté avec succès');
      reset({ ...values, name: '', email: '', phone: '', contactName: '' });
    } catch (error) {
      toast.error("Impossible d'ajouter l'acteur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <input type="hidden" {...register('type')} />
      <input type="hidden" {...register('regionId')} />
      <div>
        <label className="text-sm font-medium text-gray-700">Nom de l’acteur</label>
        <Input placeholder="Coopérative de Kindia" {...register('name')} />
        {errors.name && <p className="text-sm text-red">{errors.name.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Type</label>
        <Select
          defaultValue="COOPERATIVE"
          onValueChange={(value) => setValue('type', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un type" />
          </SelectTrigger>
          <SelectContent>
            {['COOPERATIVE', 'TRANSFORMATEUR', 'STARTUP', 'ONG', 'ASSOCIATION', 'INSTITUTION'].map(
              (type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Région</label>
        <Select onValueChange={(value) => setValue('regionId', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Toutes les régions" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.id} value={region.id}>
                {region.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <Input type="email" placeholder="contact@coop.gn" {...register('email')} />
          {errors.email && <p className="text-sm text-red">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Téléphone</label>
          <Input placeholder="+224 600 00 00 00" {...register('phone')} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Personne de contact</label>
        <Input placeholder="Nom du responsable" {...register('contactName')} />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? 'En cours…' : 'Enregistrer'}
        </Button>
      </div>
    </form>
  );
};
