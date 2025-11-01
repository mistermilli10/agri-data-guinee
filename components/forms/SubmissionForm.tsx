'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { submissionSchema } from '@/lib/validators';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = submissionSchema;

type FormValues = z.infer<typeof schema>;

export const SubmissionForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        credentials: 'include'
      });
      if (!response.ok) throw new Error('error');
      reset();
      toast.success('Votre projet a été soumis.');
    } catch (error) {
      toast.error('Erreur lors de la soumission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Nom du projet</label>
        <Input placeholder="Nom du projet" {...register('title')} />
        {errors.title && <p className="text-sm text-red">{errors.title.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Email</label>
        <Input type="email" placeholder="vous@example.com" {...register('contactEmail')} />
        {errors.contactEmail && (
          <p className="text-sm text-red">{errors.contactEmail.message}</p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Description</label>
        <Textarea rows={4} placeholder="Décrivez votre innovation" {...register('description')} />
        {errors.description && (
          <p className="text-sm text-red">{errors.description.message}</p>
        )}
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Envoi…' : 'Soumettre votre innovation'}
      </Button>
    </form>
  );
};
