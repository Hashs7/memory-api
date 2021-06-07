import { Injectable } from '@nestjs/common';

import { User } from '../user/user.schema';
import { InstrumentService } from '../instrument/instrument.service';
import { MemoryService } from '../instrument/memory/memory.service';
import { UserService } from '../user/user.service';
import { Instrument } from '../instrument/instrument.schema';
import { Types } from 'mongoose';

@Injectable()
export class FeedService {
  constructor(
    private instrumentService: InstrumentService,
    private memoryService: MemoryService,
    private userService: UserService,
  ) {}
  public async getFeed(
    user: User,
    categories?: Types.ObjectId[],
  ): Promise<{ memoriesFavInstru: Object[]; memoriesCat: Object[] }> {
    const wishList = await this.instrumentService.findMultiple(user.wishList);

    const flatMemories = wishList.reduce((acc, curr) => {
      const memories = curr.memories.map((m) => ({
        ...m.toObject(),
        instrumentId: curr.id,
      }));
      return [...acc, ...memories];
    }, []);

    const memoriesFavInstru = flatMemories.sort(
      // @ts-ignore
      (a, b) => new Date(b.date) - new Date(a.date),
    );

    const memoriesCat = await this.memoryService.search('', categories);

    return {
      memoriesFavInstru,
      memoriesCat,
    };
  }
}
