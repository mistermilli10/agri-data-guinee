'use client';

import { useState } from 'react';
import { ActorForm } from '@/components/forms/ActorForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const AddActorDialog = ({
  regions
}: {
  regions: { id: string; name: string }[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          + Ajouter un nouvel acteur
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvel acteur</DialogTitle>
          <DialogDescription>
            Renseignez les informations de votre coopérative, entreprise ou organisation.
          </DialogDescription>
        </DialogHeader>
        <ActorForm
          regions={regions}
          onSubmit={async (values) => {
            const response = await fetch('/api/actors', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
              credentials: 'include'
            });
            if (!response.ok) {
              throw new Error('error');
            }
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
