import { Controller, Get } from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('api/food')
export class FoodController {
    constructor(private readonly foodService: FoodService) { }

    @Get()
    async findAll() {
        return this.foodService.findAll();
    }
}
