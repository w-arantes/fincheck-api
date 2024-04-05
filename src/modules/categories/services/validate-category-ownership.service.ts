import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async validate(userId: string, categoryId: string) {
    const isCategoryOwner = await this.categoriesRepository.findFirst({
      where: { id: categoryId, userId },
    });

    if (!isCategoryOwner) {
      throw new NotFoundException('Category not found.');
    }
  }
}
