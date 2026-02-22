import { Controller, Get } from '@nestjs/common';
import { ShelterService } from './shelter.service';

@Controller('api/shelter')
export class ShelterController {
    constructor(private readonly shelterService: ShelterService) { }

    @Get()
    async findAll() {
        return this.shelterService.findAll();
    }
}
