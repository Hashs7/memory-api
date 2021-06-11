import { Injectable } from '@nestjs/common';

import { User } from '../user/user.schema';
import { InstrumentService } from '../instrument/instrument.service';
import { MemoryService } from '../instrument/memory/memory.service';
import { Types } from 'mongoose';

@Injectable()
export class FeedService {
  constructor(
    private instrumentService: InstrumentService,
    private memoryService: MemoryService,
  ) {}

  public async getFeedFavMemories(user: User): Promise<any[]> {
    const wishList = await this.instrumentService.findFeed(user.wishList);

    const flatMemories = wishList.reduce((acc, curr) => {
      const memories = curr.memories.map((m) => ({
        ...m.toObject(),
        instrument: {
          brand: curr.brand,
          modelName: curr.modelName,
          name: curr.name,
          image: curr.images,
        },
      }));
      return [...acc, ...memories];
    }, []);

    return flatMemories.sort(
      // @ts-ignore
      (a, b) => new Date(b.date) - new Date(a.date),
    );
  }

  public async getMemoriesCat(
    user: User,
    categories?: Types.ObjectId[],
  ): Promise<Object> {
    const memoriesCat = await this.memoryService.search(
      '',
      categories,
      categories.length * 3,
    );

    return memoriesCat.reduce((acc, cur) => {
      cur.categories.forEach((cat) => {
        // @ts-ignore
        const catId = cat._id;
        if (!(catId in acc)) {
          acc[catId] = { category: cat, memories: [] };
        }
        acc[catId].memories.push(cur);
      });
      return acc;
    }, {});
  }
}
