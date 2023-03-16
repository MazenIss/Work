import { Module } from '@nestjs/common';
import { TelemetryService } from './services/telemetry.service';
import { TelemetryController } from './controller/telemetry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Telemetry, TelemetrySchema } from './model/telemetry';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Telemetry.name, schema: TelemetrySchema }]),LoggerModule],
  providers: [TelemetryService],
  controllers: [TelemetryController],
  exports: [TelemetryService]
})
export class TelemetryModule {}
