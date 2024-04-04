import { Injectable } from '@nestjs/common';

import { CreateBankAccountDto } from '../dtos/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dtos/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly validateBankAccountOwnership: ValidateBankAccountOwnershipService,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, color, type } = createBankAccountDto;

    return this.bankAccountsRepository.create({
      data: {
        userId,
        name,
        initialBalance,
        color,
        type,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.bankAccountsRepository.findMany({
      where: { userId },
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnership.validate(userId, bankAccountId);

    const { name, initialBalance, color, type } = updateBankAccountDto;

    return this.bankAccountsRepository.update({
      where: { id: bankAccountId },
      data: {
        name,
        initialBalance,
        color,
        type,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnership.validate(userId, bankAccountId);

    await this.bankAccountsRepository.delete({
      where: { id: bankAccountId },
    });

    return null;
  }
}
