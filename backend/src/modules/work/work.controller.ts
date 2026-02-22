import { Controller, Get } from '@nestjs/common';
import { WorkService } from './work.service';

@Controller('api/work')
export class WorkController {
    constructor(private readonly workService: WorkService) { }

    @Get()
    async findAll() {
        return this.workService.findAll();
    }
}
