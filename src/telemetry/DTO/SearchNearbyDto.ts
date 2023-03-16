import { Type } from "class-transformer";
import {  IsNotEmpty, IsNumber } from "class-validator";

export class SearchNearbyDto {
     @Type(() => Number)
    @IsNotEmpty()
     @IsNumber()
    userLongitude: number;
     @Type(() => Number)
     @IsNotEmpty()
     @IsNumber()
    userLatitude: number;
     @Type(() => Number)
     @IsNotEmpty()
     @IsNumber()
    radius: number;
  }