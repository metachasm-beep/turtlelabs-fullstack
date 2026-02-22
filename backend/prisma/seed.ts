import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    const projects = [
        // FOOD
        {
            title: 'Vertical Farming Initiative',
            description: 'Sustainable urban vertical farming systems designed for high-density areas, reducing water use by 90%.',
            category: 'FOOD',
            status: 'ACTIVE',
        },
        {
            title: 'Algae-Based Nutrition',
            description: 'Developing nutrient-dense food supplements from sustainable, carbon-sequestering algae cultures.',
            category: 'FOOD',
            status: 'PLANNING',
        },

        // WATER
        {
            title: 'Atmospheric Water Generation',
            description: 'Extracting clean, mineral-rich drinking water directly from air moisture using renewable energy.',
            category: 'WATER',
            status: 'ACTIVE',
        },
        {
            title: 'Graphene Filtration',
            description: 'Low-energy desalination and heavy metal purification using advanced graphene-oxide membranes.',
            category: 'WATER',
            status: 'R&D',
        },

        // SHELTER
        {
            title: '3D Printed Sustainable Housing',
            description: 'Rapidly deployable, low-cost homes built from locally sourced soil and recycled polymers.',
            category: 'SHELTER',
            status: 'ACTIVE',
        },
        {
            title: 'Modular Eco-Pods',
            description: 'Self-sustaining living units with integrated solar glass, rainwater harvesting, and greywater recycling.',
            category: 'SHELTER',
            status: 'PROTOTYPE',
        },

        // EDUCATION
        {
            title: 'Decentralized Learning Platform',
            description: 'Blockchain-verified education modules providing critical skills to remote and underserved communities.',
            category: 'EDUCATION',
            status: 'ACTIVE',
        },

        // WORK
        {
            title: 'Remote Workspace Network',
            description: 'A global network of decentralized professional hubs designed for rural economic revitalization.',
            category: 'WORK',
            status: 'ACTIVE',
        },

        // ENERGY
        {
            title: 'Thorium Salt Reactor R&D',
            description: 'Researching next-generation clean nuclear energy solutions for safe, localized power grids.',
            category: 'ENERGY',
            status: 'R&D',
        },
        {
            title: 'Solid-State Battery Tech',
            description: 'High-density, cobalt-free energy storage for renewable microgrids and electric transport.',
            category: 'ENERGY',
            status: 'PLANNING',
        },
    ];

    for (const project of projects) {
        const createdProject = await prisma.project.upsert({
            where: { id: `seed-${project.title.toLowerCase().replace(/\s+/g, '-')}` },
            update: project as any,
            create: {
                id: `seed-${project.title.toLowerCase().replace(/\s+/g, '-')}`,
                ...project as any
            },
        });
        console.log(`✅ Seeded project: ${createdProject.title}`);
    }

    console.log('🏁 Seeding finished.');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
