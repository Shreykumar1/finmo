import { Controller, Post, Patch, Get, Body, Param, HttpCode } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { AllocateParkingDto } from './dto/allocate-parking.dto';
import { ClearParkingDto } from './dto/clear-parking.dto';
import { CreateParkingDto } from './dto/create-parking.dto';
import { ExpandParkingDto } from './dto/expand-parking.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('parking')
@Controller('')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post('parking_lot')
  @ApiResponse({ status: 201, description: 'Parking lot created.' })
  @ApiBody({ 
    type: CreateParkingDto, 
    description: 'Number of slots to create', 
    examples: {
      example1: {
        value: { no_of_slot: 7 },
        summary: 'Create a parking lot with 7 slots',
      },
    },
  })
  createParkingLot(@Body() dto: CreateParkingDto) {
    return this.parkingService.initializeParkingLot(dto);
  }

  @Patch('parking_lot')
  @ApiResponse({ status: 200, description: 'Parking lot expanded.' })
  @ApiBody({ 
    type: ExpandParkingDto, 
    description: 'Number of slots to add', 
    examples: {
      example1: {
        value: { increment_slot: 5 },
        summary: 'Expand the parking lot by 5 slots',
      },
    },
  })
  expandParkingLot(@Body() dto: ExpandParkingDto) {
    return this.parkingService.expandParkingLot(dto);
  }

  @Post('park')
  @ApiResponse({ status: 200, description: 'Parking allocated.' })
  @ApiBody({ 
    type: AllocateParkingDto, 
    description: 'Car registration and color', 
    examples: {
      example1: {
        value: { car_reg_no: 'KA-01-AB-2211', car_color: 'Red' },
        summary: 'Allocate parking for a Red car with registration KA-01-AB-2211',
      },
      example2: {
        value: { car_reg_no: 'KA-01-BC-3366', car_color: 'white' },
        summary: 'Allocate parking for a white car with registration KA-01-BC-3366',
      }
    },
  })
  allocateParking(@Body() dto: AllocateParkingDto) {
    return this.parkingService.allocateParking(dto);
  }

  @Post('clear')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Parking cleared.' })
  @ApiBody({ 
    type: ClearParkingDto, 
    description: 'Slot number or car registration to clear', 
    examples: {
      example1: {
        value: { car_registration_no: 'KA-01-AB-2211' },
        summary: 'Clear parking for the car with registration KA-01-AB-2211',
      },
      example2: {
        value: { slot_number: 3 },
        summary: 'Clear parking for slot number 3',
      },
    },
  })
  clearParking(@Body() dto: ClearParkingDto) {
    return this.parkingService.clearParking(dto);
  }

  @Get('status')
  @ApiResponse({ status: 200, description: 'Get occupied slots.' })
  getOccupiedSlots() {
    return this.parkingService.getOccupiedSlots();
  }

  @Get('registration_numbers/:color')
  @ApiResponse({ status: 200, description: 'Get cars by color.' })
  getCarsByColor(@Param('color') color: string) {
    return this.parkingService.getRegistrationNumbersByColor(color);
  }

  @Get('slot_numbers/:color')
  @ApiResponse({ status: 200, description: 'Get slot numbers by color.' })
  getSlotsByColor(@Param('color') color: string) {
    return this.parkingService.getSlotNumbersByColor(color);
  }

  @Get('slot/:regNo')
  @ApiResponse({ status: 200, description: 'Get slot by registration number.' })
  getSlotByRegNo(@Param('regNo') regNo: string) {
    return this.parkingService.getSlotByRegistration(regNo);
  }
}
