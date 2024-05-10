import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async getAllByUserId(userId: number): Promise<PaginatedResponse<Deed>> {
    return await this.deedsRepository.findAndCount({ where: { user: { id: userId } } });
  }

  async create(userId: number, createDeedDto: CreateDeedDto): Promise<Deed> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new UnauthorizedException("You're not authenticated");
    const deed = await this.deedsRepository.save({ user, ...createDeedDto });
    return deed;
  }

  async update(userId: number, deedId: number, updateDeedDto: UpdateDeedDto): Promise<void> {
    const deed = await this.deedsRepository.findOne({ where: { id: deedId }, relations: { user: true } });
    if (!deed) throw new NotFoundException(`Deed with id ${deedId} not found`);
    if (deed.user.id !== userId) throw new ForbiddenException("You're not allowed to do that");
    await this.deedsRepository.save({ ...deed, ...updateDeedDto });
  }

  async delete(userId: number, deedId: number): Promise<void> {
    const deed = await this.deedsRepository.findOne({ where: { id: deedId }, relations: { user: true } });
    if (!deed) throw new NotFoundException(`Deed with id ${deedId} not found`);
    if (deed.user.id !== userId) throw new ForbiddenException("You're not allowed to do that");
    await this.deedsRepository.delete({ id: deedId });
  }
}
