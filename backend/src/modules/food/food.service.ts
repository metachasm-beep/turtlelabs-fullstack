import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class FoodService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.project.findMany({
            where: { category: 'FOOD' }
        });
    }
}
