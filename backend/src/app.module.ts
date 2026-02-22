import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './modules/food/food.module';
import { WaterModule } from './modules/water/water.module';
import { ShelterModule } from './modules/shelter/shelter.module';
import { EducationModule } from './modules/education/education.module';
import { WorkModule } from './modules/work/work.module';
import { EnergyModule } from './modules/energy/energy.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    PrismaModule,
    FoodModule,
    WaterModule,
    ShelterModule,
    EducationModule,
    WorkModule,
    EnergyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
