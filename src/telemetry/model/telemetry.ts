import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type TelemetryDocument=Telemetry & Document;

@Schema({ timestamps: true })
export class Telemetry {

    @Prop({ required: true })
    busId: string;
      //[longitude,latitude]
    @Prop({ type: { type: String, default: 'Point' }, coordinates: [Number] })
    location: { type: { type: String, default: 'Point' }, coordinates: [number, number]};

    @Prop({ required: true })
    nextStop: string;
}

export const TelemetrySchema = SchemaFactory.createForClass(Telemetry);
//  Create the 2dsphere index on the location field
TelemetrySchema.index({ location: '2dsphere' });

