import { Test, TestingModule } from '@nestjs/testing';
import { ParkingController } from './parking/parking.controller';
import { ParkingService } from './parking/parking.service';
import { CreateParkingDto } from './parking/dto/create-parking.dto';
import { AllocateParkingDto } from './parking/dto/allocate-parking.dto';
import { ClearParkingDto } from './parking/dto/clear-parking.dto';
import { ExpandParkingDto } from './parking/dto/expand-parking.dto';

describe('ParkingController', () => {
  let parkingController: ParkingController;
  let parkingService: ParkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingController],
      providers: [
        {
          provide: ParkingService,
          useValue: {
            initializeParkingLot: jest.fn(),
            allocateParking: jest.fn(),
            clearParking: jest.fn(),
            expandParkingLot: jest.fn(),
            getOccupiedSlots: jest.fn(),
            getRegistrationNumbersByColor: jest.fn(),
            getSlotNumbersByColor: jest.fn(),
            getSlotByRegistration: jest.fn(),
          },
        },
      ],
    }).compile();

    parkingController = module.get<ParkingController>(ParkingController);
    parkingService = module.get<ParkingService>(ParkingService);
  });

  describe('createParkingLot', () => {
    it('should initialize parking lot', () => {
      const dto: CreateParkingDto = { no_of_slot: 5 };
      jest.spyOn(parkingService, 'initializeParkingLot').mockReturnValue({ total_slot: 5 });

      expect(parkingController.createParkingLot(dto)).toEqual({ total_slot: 5 });
      expect(parkingService.initializeParkingLot).toHaveBeenCalledWith(dto);
    });
  });

  describe('allocateParking', () => {
    it('should allocate parking slot', () => {
      const dto: AllocateParkingDto = { car_reg_no: 'ABC123', car_color: 'Red' };
      jest.spyOn(parkingService, 'allocateParking').mockReturnValue({ allocated_slot_number: 1 });

      expect(parkingController.allocateParking(dto)).toEqual({ allocated_slot_number: 1 });
      expect(parkingService.allocateParking).toHaveBeenCalledWith(dto);
    });
  });

  describe('clearParking', () => {
    it('should clear parking slot', () => {
      const dto: ClearParkingDto = { slot_number: 1 };
      jest.spyOn(parkingService, 'clearParking').mockReturnValue({ freed_slot_number: 1 });

      expect(parkingController.clearParking(dto)).toEqual({ freed_slot_number: 1 });
      expect(parkingService.clearParking).toHaveBeenCalledWith(dto);
    });
  });

  describe('expandParkingLot', () => {
    it('should expand parking lot', () => {
      const dto: ExpandParkingDto = { increment_slot: 5 };
      jest.spyOn(parkingService, 'expandParkingLot').mockReturnValue({ total_slot: 10 });

      expect(parkingController.expandParkingLot(dto)).toEqual({ total_slot: 10 });
      expect(parkingService.expandParkingLot).toHaveBeenCalledWith(dto);
    });
  });

  describe('getOccupiedSlots', () => {
    it('should return occupied slots', () => {
      const occupiedSlots = [{ slot_no: 1, registration_no: 'ABC123', color: 'Red' }];
      jest.spyOn(parkingService, 'getOccupiedSlots').mockReturnValue(occupiedSlots);

      expect(parkingController.getOccupiedSlots()).toEqual(occupiedSlots);
      expect(parkingService.getOccupiedSlots).toHaveBeenCalled();
    });
  });

  describe('getCarsByColor', () => {
    it('should return cars by color', () => {
      const color = 'Red';
      const registrationNumbers = ['ABC123'];
      jest.spyOn(parkingService, 'getRegistrationNumbersByColor').mockReturnValue(registrationNumbers);

      expect(parkingController.getCarsByColor(color)).toEqual(registrationNumbers);
      expect(parkingService.getRegistrationNumbersByColor).toHaveBeenCalledWith(color);
    });
  });

  describe('getSlotsByColor', () => {
    it('should return slot numbers by color', () => {
      const color = 'Red';
      const slotNumbers = [1];
      jest.spyOn(parkingService, 'getSlotNumbersByColor').mockReturnValue(slotNumbers);

      expect(parkingController.getSlotsByColor(color)).toEqual(slotNumbers);
      expect(parkingService.getSlotNumbersByColor).toHaveBeenCalledWith(color);
    });
  });

  describe('getSlotByRegNo', () => {
    it('should return slot number by registration number', () => {
      const regNo = 'ABC123';
      const slotInfo = { slot_number: 1 };
      jest.spyOn(parkingService, 'getSlotByRegistration').mockReturnValue(slotInfo);

      expect(parkingController.getSlotByRegNo(regNo)).toEqual(slotInfo);
      expect(parkingService.getSlotByRegistration).toHaveBeenCalledWith(regNo);
    });
  });
}); 