import { Controller, Get } from '@nestjs/common';
import { EnergyService } from './energy.service';

@Controller('api/energy')
export class EnergyController {
    constructor(private readonly energyService: EnergyService) { }

    @Get()
    async findAll() {
        return this.energyService.findAll();
    }
}
