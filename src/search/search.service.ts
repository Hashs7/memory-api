import { Injectable, Logger } from '@nestjs/common';
import { InstrumentService } from '../instrument/instrument.service';
import { MemoryService } from '../instrument/memory/memory.service';
import { Instrument } from '../instrument/instrument.schema';
import { Types } from 'mongoose';

@Injectable()
export class SearchService {
  constructor(
    private instrumentService: InstrumentService,
    private memoryService: MemoryService,
  ) {}
  public async search(
    text: string,
    categories?: Types.ObjectId[],
    forSale?: string,
    instruTypes?: string,
  ): Promise<{ instruments: Instrument[]; memories: Object[] }> {
    let instrumentRes = await this.instrumentService.search(
      text,
      forSale,
      instruTypes,
    );
    instrumentRes = this.instrumentService.searchSerialize(instrumentRes);

    const memoryRes = await this.memoryService.search(text, categories);

    return {
      instruments: instrumentRes,
      memories: memoryRes,
    };
  }
}
