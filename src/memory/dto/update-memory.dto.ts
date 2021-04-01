import { PartialType } from '@nestjs/swagger';
import { CreateMemoryDto } from './create-memory.dto';

export class UpdateMemoryDto extends PartialType(CreateMemoryDto) {}
