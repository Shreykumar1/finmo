import { ApiProperty } from '@nestjs/swagger';

export class CreateParkingDto {
    @ApiProperty({ example: 7, description: 'Number of slots to create' })
    no_of_slot: number;
}