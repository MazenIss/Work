import { Body, Controller, Get } from '@nestjs/common';
import { SearchNearbyDto } from '../DTO/SearchNearbyDto';
import { Telemetry } from '../model/telemetry';
import { TelemetryService } from '../services/telemetry.service';

@Controller('telemetry')
export class TelemetryController {
    constructor(private readonly TelmeteryService: TelemetryService){}


@Get()
FindAll(): Promise<Telemetry[]>{
  return this.TelmeteryService.findAll();
}

@Get("/closest")
FindClosest(@Body() searchNearbyDto : SearchNearbyDto ): Promise<Telemetry[]>{
  return this.TelmeteryService.findByLocation(searchNearbyDto);
}




}
