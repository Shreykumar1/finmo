import { ApiProperty } from '@nestjs/swagger';

export class ExpandParkingDto {
    @ApiProperty({ example: 5, description: 'Number of slots to add' })
    increment_slot: number;
}