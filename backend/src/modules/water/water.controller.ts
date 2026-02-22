import { Controller, Get } from '@nestjs/common';
import { WaterService } from './water.service';

@Controller('api/water')
export class WaterController {
    constructor(private readonly waterService: WaterService) { }

    @Get()
    async findAll() {
        return this.waterService.findAll();
    }
}
