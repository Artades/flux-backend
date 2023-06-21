import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserBioDto {
  @ApiProperty({
    default: 'There is no bio yet',
  })
  bio: string;
}
