import { ApiProperty } from '@nestjs/swagger';

export class ClearParkingDto {
    @ApiProperty({ required: false, example: 3, description: 'Slot number to clear' })
    slot_number?: number;

    @ApiProperty({ required: false, example: 'KA-01-AB-2211', description: 'Car registration number to clear' })
    car_registration_no?: string;
}