import { ApiProperty } from '@nestjs/swagger';

export class AllocateParkingDto {
    @ApiProperty({ example: 'KA-01-BC-3366', description: 'Car registration number' })
    car_reg_no: string;

    @ApiProperty({ example: 'white', description: 'Car color' })
    car_color: string;
}