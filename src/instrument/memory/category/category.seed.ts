import { Injectable } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Command } from 'nestjs-command';
import { CreateCategoryDto } from './dto/create-category.dto';

export const datas: CreateCategoryDto[] = [
  { name: 'Acquisition' },
  { name: 'Réparation' },
  { name: 'Entretien' },
  { name: 'Customisation' },
  { name: 'Passation' },

  { name: 'Concert' },
  { name: 'Répétition' },
  { name: 'Enregistrement' },
  { name: 'Jeu entre amis' },
  { name: 'Tournée' },

  { name: 'Voyage' },
  { name: 'Autres' },
];
@Injectable()
export class CategorySeed {
  constructor(private readonly categoryService: CategoryService) {}

  @Command({
    command: 'create:memory:categories',
    describe: 'Populate memory categories',
    autoExit: true,
  })
  async create() {
    await this.categoryService.createMultiple(datas);
  }
}
