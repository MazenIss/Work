import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MqttClient, connect } from 'mqtt';
import { LoggerService } from 'src/logger/logger.service';
import { TelemetryService } from 'src/telemetry/services/telemetry.service';

@Injectable()
export class MqttService {
  private  brokerUrl = this.configService.get<string>('BROKERURL');
  private mqttClient: MqttClient;

  constructor(private configService: ConfigService,private readonly telemetryService: TelemetryService,
    private readonly loggerService: LoggerService) {}

  connect(): void {
    //connect to the broker
    this.mqttClient = connect(this.brokerUrl);
    // when connection is established subscribe to the buses topic
    this.mqttClient.on('connect', () => {
      this.mqttClient.subscribe('buses');
      this.loggerService.log('Connected to MQTT broker');
    });
    // when a new message is emitted store it
    this.mqttClient.on('message', (topic, message) => {
      const telemetryData = JSON.parse(message.toString());
      this.telemetryService.storeTelemetry(telemetryData);
      this.loggerService.log(`Received telemetry data: ${JSON.stringify(telemetryData)}`);
    });
    this.mqttClient.on('error',(error)=>{
      this.loggerService.error(`MQTT error: ${error}`);
    })
  }
}
