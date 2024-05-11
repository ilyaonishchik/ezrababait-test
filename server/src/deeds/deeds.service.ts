import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deed } from './models/deed.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/models/user.entity';
import { CreateDeedDto } from './models/create-deed.dto';
import { UpdateDeedDto } from './models/update-deed.dto';
import { PaginatedResponse } from 'src/_shared/paginated.response';

@Injectable()
export class DeedsService {
  constructor(
    @InjectRepository(Deed) private readonly deedsRepository: Repository<Deed>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async createDeed(decodedId: number, userId: number, createDeedDto: CreateDeedDto): Promise<Deed> {
    if (decodedId !== userId) throw new ForbiddenException("You're not allowed");
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);
    return await this.deedsRepository.save({ user, ...createDeedDto });
  }

  async getUserDeeds(userId: number, page: number, take: number): Promise<PaginatedResponse<Deed>> {
    page = page || 1;
    take = take || 5;
    return await this.deedsRepository.findAndCount({
      where: { user: { id: userId } },
      skip: (page - 1) * take,
      take,
      order: { createdAt: { direction: 'DESC' } },
    });
  }

  async updateDeed(decodedId: number, userId: number, deedId: number, updateDeedDto: UpdateDeedDto) {
    if (decodedId !== userId) throw new ForbiddenException("You're not allowed");
    const deed = await this.deedsRepository.findOne({ where: { id: deedId, user: { id: userId } } });
    if (!deed) throw new NotFoundException(`Deed with id ${deedId} not found`);
    await this.deedsRepository.save({ ...deed, ...updateDeedDto });
  }

  async deleteDeed(decodedId: number, userId: number, deedId: number) {
    if (decodedId !== userId) throw new ForbiddenException("You're not allowed");
    const deed = await this.deedsRepository.findOne({ where: { id: deedId, user: { id: userId } } });
    if (!deed) throw new NotFoundException(`Deed with id ${deedId} not found`);
    await this.deedsRepository.delete({ id: deedId });
  }
}
