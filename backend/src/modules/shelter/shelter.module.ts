import { Module } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { ShelterController } from './shelter.controller';

@Module({
    controllers: [ShelterController],
    providers: [ShelterService],
})
export class ShelterModule { }
