import { Injectable } from '@nestjs/common';
import { InstrumentService } from '../instrument/instrument.service';
import { MemoryService } from '../instrument/memory/memory.service';
import { Instrument } from '../instrument/instrument.schema';
import { Memory } from '../instrument/memory/memory.schema';

@Injectable()
export class SearchService {
  constructor(
    private instrumentService: InstrumentService,
    private memoryService: MemoryService,
  ) {}
  public async search(
    searchContent: string,
  ): Promise<{ instruments: Instrument[]; memories: Memory[] }> {
    const instrumentRes = await this.instrumentService.search(searchContent);
    const memoryRes = await this.memoryService.search(searchContent);

    return {
      instruments: instrumentRes,
      memories: memoryRes,
    };
  }
}
