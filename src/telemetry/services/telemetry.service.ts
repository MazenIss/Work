import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoggerService } from 'src/logger/logger.service';
import { SearchNearbyDto } from '../DTO/SearchNearbyDto';
import { TelemetryDto } from '../DTO/TelemetryDto';
import { Telemetry, TelemetryDocument } from '../model/telemetry';

@Injectable()
export class TelemetryService {
    constructor(
        @InjectModel(Telemetry.name)
        private telemetryDataModel: Model<TelemetryDocument>,
        private readonly loggerService: LoggerService
      ) {
    }

    async storeTelemetry(data: TelemetryDto): Promise<Telemetry> {
        const createdTelemetryData = new this.telemetryDataModel(data);
        this.loggerService.log(`Persisted telemetry data: ${JSON.stringify(createdTelemetryData)}`);
        return createdTelemetryData.save();
    }
    
    async findAll(): Promise<Telemetry[]> {
        return this.telemetryDataModel.find().exec();
    }
    
    async findByLocation(searchNearbyDto : SearchNearbyDto): Promise<Telemetry[]> {
        const data= await this.telemetryDataModel.find({
          location: {
            $nearSphere: {
              $geometry: {
                type: "Point",
                coordinates: [searchNearbyDto.userLongitude, searchNearbyDto.userLatitude]
              },
              $maxDistance: searchNearbyDto.radius
            }
          },
        }).exec();
        return data;
    }

 
}
