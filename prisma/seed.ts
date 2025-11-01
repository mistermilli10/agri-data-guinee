import { PrismaClient, ActorType, FiliereType, ProjectKind, ProjectStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.submission.deleteMany();
  await prisma.project.deleteMany();
  await prisma.filiere.deleteMany();
  await prisma.actor.deleteMany();
  await prisma.regionStat.deleteMany();
  await prisma.region.deleteMany();
  await prisma.user.deleteMany();

  const regionsData = [
    'Kindia',
    'Kankan',
    'Faranah',
    'N’Zérékoré',
    'Labé',
    'Mamou',
    'Boké',
    'Conakry'
  ];

  const regions = await Promise.all(
    regionsData.map((name) =>
      prisma.region.create({
        data: {
          name,
          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          stats: {
            create: {
              year: 2024,
              productionTons: Math.floor(Math.random() * 10000) + 5000,
              transformationTons: Math.floor(Math.random() * 4000) + 800
            }
          }
        }
      })
    )
  );

  const actors = await Promise.all(
    [
      {
        name: 'Coop. Kindia Fruit',
        type: ActorType.COOPERATIVE,
        regionId: regions[0].id,
        members: 240,
        contactName: 'Aissatou Diallo',
        status: 'actif'
      },
      {
        name: 'Agro-Kankan SARL',
        type: ActorType.TRANSFORMATEUR,
        regionId: regions[1].id,
        members: 120,
        contactName: 'Ibrahima Camara',
        status: 'actif'
      },
      {
        name: 'AgriTech Guinée',
        type: ActorType.STARTUP,
        regionId: regions[7].id,
        members: 18,
        contactName: 'Mariam Bah',
        status: 'en croissance'
      },
      {
        name: 'ONG Forêt Sud',
        type: ActorType.ONG,
        regionId: regions[3].id,
        members: 45,
        contactName: 'Pierre Kolié',
        status: 'actif'
      }
    ].map((data) => prisma.actor.create({ data }))
  );

  const filieres = await Promise.all(
    [
      {
        name: 'Mangue de Kindia',
        type: FiliereType.PRODUCTION,
        regionId: regions[0].id,
        product: 'Mangue',
        volumeTons: 12000,
        mainActorId: actors[0].id,
        contact: 'contact@mangue-kindia.gn'
      },
      {
        name: 'Riz Local de Kankan',
        type: FiliereType.TRANSFORMATION,
        regionId: regions[1].id,
        product: 'Riz',
        volumeTons: 3500,
        mainActorId: actors[1].id,
        contact: 'info@riz-kankan.gn'
      },
      {
        name: 'Moringa de Faranah',
        type: FiliereType.INNOVATION,
        regionId: regions[2].id,
        product: 'Moringa',
        volumeTons: 850,
        mainActorId: actors[2].id,
        contact: 'innovation@moringa.gn'
      }
    ].map((data) => prisma.filiere.create({ data }))
  );

  await prisma.project.createMany({
    data: [
      {
        title: 'PDRI - Projet de Développement Rural Intégré',
        kind: ProjectKind.GOVT,
        status: ProjectStatus.ACTIVE,
        summary: 'Modernisation des infrastructures de stockage et de transport.',
        budgetUSD: 1500000,
        progress: 65
      },
      {
        title: 'PRODAF - Programme de Développement Agricole et Financier',
        kind: ProjectKind.GOVT,
        status: ProjectStatus.PLANNED,
        summary: 'Soutien financier aux coopératives rurales.',
        budgetUSD: 2100000,
        progress: 30
      },
      {
        title: 'Startup AgriSense',
        kind: ProjectKind.STARTUP,
        status: ProjectStatus.ACTIVE,
        summary: 'Capteurs IoT pour la surveillance des cultures.',
        budgetUSD: 450000,
        progress: 80
      },
      {
        title: 'Innovation MoringaLab',
        kind: ProjectKind.PRIVATE,
        status: ProjectStatus.ACTIVE,
        summary: 'Valorisation des plantes médicinales.',
        budgetUSD: 320000,
        progress: 55
      },
      {
        title: 'Recherche AgroClimat',
        kind: ProjectKind.RESEARCH,
        status: ProjectStatus.PLANNED,
        summary: 'Études des impacts climatiques sur le rendement agricole.',
        progress: 25
      }
    ]
  });

  await prisma.user.createMany({
    data: [
      { email: 'contact@agridata.gov.gn', role: 'admin' },
      { email: 'utilisateur@agridata.gn', role: 'user' }
    ]
  });

  console.log('Seed executed successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
