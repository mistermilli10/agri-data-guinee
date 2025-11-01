import { z } from 'zod';

export const filterQuerySchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  regionId: z.string().optional(),
  type: z.string().optional(),
  product: z.string().optional(),
  q: z.string().optional()
});

export const filiereCreateSchema = z.object({
  name: z.string().min(2),
  type: z.string(),
  regionId: z.string().nullable().optional(),
  product: z.string(),
  volumeTons: z.number().nullable().optional(),
  mainActorId: z.string().nullable().optional(),
  contact: z.string().nullable().optional()
});

export const actorCreateSchema = z.object({
  name: z.string().min(2),
  type: z.string(),
  regionId: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  members: z.number().int().nonnegative().nullable().optional(),
  foundedAt: z.number().int().min(1900).max(2100).nullable().optional(),
  contactName: z.string().nullable().optional(),
  website: z.string().url().nullable().optional(),
  status: z.string().nullable().optional()
});

export const submissionSchema = z.object({
  title: z.string().min(2),
  contactEmail: z.string().email(),
  description: z.string().min(10)
});

export const paginationDefaults = {
  page: 1,
  pageSize: 10
};

export const getPagination = (params: URLSearchParams) => {
  const page = Number(params.get('page') ?? paginationDefaults.page);
  const pageSize = Number(params.get('pageSize') ?? paginationDefaults.pageSize);
  return {
    page: Number.isNaN(page) ? paginationDefaults.page : page,
    pageSize: Number.isNaN(pageSize) ? paginationDefaults.pageSize : pageSize
  };
};
