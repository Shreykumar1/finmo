import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AllocateParkingDto } from './dto/allocate-parking.dto';
import { ClearParkingDto } from './dto/clear-parking.dto';
import { CreateParkingDto } from './dto/create-parking.dto';
import { ExpandParkingDto } from './dto/expand-parking.dto';

@Injectable()
export class ParkingService {
  private totalSlots: number = 0;
  private availableSlots: number[] = [];
  private parkingMap = new Map<number, { regNo: string; color: string }>();

  initializeParkingLot(dto: CreateParkingDto) {
    this.totalSlots = dto.no_of_slot;
    this.availableSlots = Array.from({ length: this.totalSlots }, (_, i) => i + 1);
    this.parkingMap.clear();
    return { total_slot: this.totalSlots };
  }

  expandParkingLot(dto: ExpandParkingDto) {
    const newSlots = Array.from(
      { length: dto.increment_slot },
      (_, i) => this.totalSlots + i + 1,
    );
    this.availableSlots.push(...newSlots);
    this.totalSlots += dto.increment_slot;
    return { total_slot: this.totalSlots };
  }

  allocateParking(dto: AllocateParkingDto) {
    if (this.availableSlots.length === 0) {
      throw new BadRequestException('Parking lot is full');
    }
    const slotNumber = this.availableSlots.shift();
    
    if (slotNumber === undefined) {
      throw new BadRequestException('Failed to allocate parking slot');
    }

    this.parkingMap.set(slotNumber, { regNo: dto.car_reg_no, color: dto.car_color });
    return { allocated_slot_number: slotNumber };
  }

  clearParking(dto: ClearParkingDto) {
    let slotNumber;
    if (dto.slot_number) {
      slotNumber = dto.slot_number;
    } else if (dto.car_registration_no) {
      for (const [slot, car] of this.parkingMap.entries()) {
        if (car.regNo === dto.car_registration_no) {
          slotNumber = slot;
          break;
        }
      }
    }
    if (!slotNumber || !this.parkingMap.has(slotNumber)) {
      throw new NotFoundException('Car/slot not found');
    }
    this.parkingMap.delete(slotNumber);
    this.availableSlots.push(slotNumber);
    this.availableSlots.sort((a, b) => a - b);
    return { freed_slot_number: slotNumber };
  }

  getOccupiedSlots() {
    return Array.from(this.parkingMap.entries()).map(([slot, car]) => ({
      slot_no: slot,
      registration_no: car.regNo,
      color: car.color,
    }));
  }

  getRegistrationNumbersByColor(color: string) {
    return Array.from(this.parkingMap.values())
      .filter(car => car.color === color)
      .map(car => car.regNo);
  }

  getSlotNumbersByColor(color: string) {
    return Array.from(this.parkingMap.entries())
      .filter(([_, car]) => car.color === color)
      .map(([slot]) => slot);
  }

  getSlotByRegistration(regNo: string) {
    for (const [slot, car] of this.parkingMap.entries()) {
      if (car.regNo === regNo) return { slot_number: slot };
    }
    throw new NotFoundException('Car not found');
  }
}