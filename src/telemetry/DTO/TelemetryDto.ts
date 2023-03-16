import { IsNotEmpty } from "class-validator";

export class TelemetryDto {
    @IsNotEmpty()
    busId: string;
    @IsNotEmpty()
    location: {
      type: string;
      coordinates: [number, number];
    };
    @IsNotEmpty()
    nextStop: string;
  }