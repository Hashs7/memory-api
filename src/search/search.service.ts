import { Injectable } from '@nestjs/common';
import { InstrumentService } from '../instrument/instrument.service';
import { MemoryService } from '../instrument/memory/memory.service';

@Injectable()
export class SearchService {
  constructor(
    private instrumentService: InstrumentService,
    private memoryService: MemoryService,
  ) {}
  public async search(q: any): Promise<any> {
    const searchContent = q.search;
    const instrumentRes = await this.instrumentService.search(searchContent);
    const memoryRes = await this.memoryService.search(searchContent);

    return {
      instruments: instrumentRes,
      memories: memoryRes,
    };
  }
}
