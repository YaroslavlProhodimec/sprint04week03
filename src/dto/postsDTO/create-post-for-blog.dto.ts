import { IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostForBlogDto {
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
}
