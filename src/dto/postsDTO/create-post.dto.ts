import { IsString, IsNotEmpty, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Length(1, 30, { message: 'Incorrect title' })
  title: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Length(1, 100, { message: 'Incorrect shortDescription' })
  shortDescription: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Length(1, 1000, { message: 'Incorrect content' })
  content: string;

  @IsString()
  @IsNotEmpty({ message: 'Incorrect blogId' })
  blogId: string;
}

export class UpdatePostDto {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Length(1, 30, { message: 'Incorrect title' })
  title: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Length(1, 100, { message: 'Incorrect shortDescription' })
  shortDescription: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Length(1, 1000, { message: 'Incorrect content' })
  content: string;

  @IsString()
  @IsNotEmpty({ message: 'Incorrect blogId' })
  blogId: string;
}
