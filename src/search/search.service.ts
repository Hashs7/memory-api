import { Injectable, Logger } from '@nestjs/common';
import { InstrumentService } from '../instrument/instrument.service';
import { MemoryService } from '../instrument/memory/memory.service';
import { Instrument } from '../instrument/instrument.schema';
import { Types } from 'mongoose';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';

@Injectable()
export class SearchService {
  constructor(
    private instrumentService: InstrumentService,
    private memoryService: MemoryService,
    private userService: UserService,
  ) {}

  /**
   * Search query instruments
   * @param text
   * @param categories
   * @param forSale
   * @param instruTypes
   */
  public async search(
    text: string,
    categories?: Types.ObjectId[],
    forSale?: string,
    instruTypes?: string,
  ): Promise<{ instruments: Instrument[]; memories: Object[]; users: User[] }> {
    let instrumentRes = await this.instrumentService.search(
      text,
      forSale,
      instruTypes,
    );

    instrumentRes = this.instrumentService.searchSerialize(instrumentRes);

    const memoryRes = await this.memoryService.search(text, categories, 10);

    const userRes = await this.userService.search(text);

    return {
      instruments: instrumentRes,
      memories: memoryRes,
      users: userRes,
    };
  }
}
