import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { TelemetryModule } from 'src/telemetry/telemetry.module';
import { MqttService } from './mqtt.service';


@Module({
    imports: [TelemetryModule,LoggerModule],
    providers: [MqttService],
    exports: [MqttService],

})
export class MqttModule {}
