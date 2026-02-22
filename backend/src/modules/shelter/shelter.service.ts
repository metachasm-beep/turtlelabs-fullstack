import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ShelterService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.project.findMany({
            where: { category: 'SHELTER' }
        });
    }
}
