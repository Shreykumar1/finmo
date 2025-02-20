import { Controller, Post, Patch, Get, Body, Param } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { AllocateParkingDto } from './dto/allocate-parking.dto';
import { ClearParkingDto } from './dto/clear-parking.dto';
import { CreateParkingDto } from './dto/create-parking.dto';
import { ExpandParkingDto } from './dto/expand-parking.dto';

@Controller('')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post('parking_lot')
  createParkingLot(@Body() dto: CreateParkingDto) {
    return this.parkingService.initializeParkingLot(dto);
  }

  @Patch('parking_lot')
  expandParkingLot(@Body() dto: ExpandParkingDto) {
    return this.parkingService.expandParkingLot(dto);
  }

  @Post('park')
  allocateParking(@Body() dto: AllocateParkingDto) {
    return this.parkingService.allocateParking(dto);
  }

  @Post('clear')
  clearParking(@Body() dto: ClearParkingDto) {
    return this.parkingService.clearParking(dto);
  }


}
