import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DeedsService } from './deeds.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DecodedPayload } from 'src/auth/decorators/decoded-payload.decorator';
import { JwtDecodedPayload } from 'src/auth/models/jwt-decoded-payload';
import { Deed } from './models/deed.entity';
import { CreateDeedDto } from './models/create-deed.dto';
import { MessageResponse } from 'src/_shared/message.response';
import { UpdateDeedDto } from './models/update-deed.dto';
import { PaginatedResponse } from 'src/_shared/paginated.response';

@Controller('deeds')
export class DeedsController {
  constructor(private deedsService: DeedsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@DecodedPayload() { id }: JwtDecodedPayload, @Body() createDeedDto: CreateDeedDto): Promise<Deed> {
    return await this.deedsService.create(id, createDeedDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  async find(@DecodedPayload() { id: userId }: JwtDecodedPayload): Promise<PaginatedResponse<Deed>> {
    return await this.deedsService.findByUserId(userId);
  }

  @UseGuards(JwtGuard)
  @Put(':deedId')
  async update(
    @DecodedPayload() { id: userId }: JwtDecodedPayload,
    @Param('deedId') deedId: string,
    @Body() updateDeedDto: UpdateDeedDto,
  ): Promise<MessageResponse> {
    await this.deedsService.update(userId, +deedId, updateDeedDto);
    return { message: 'Succesfully updated' };
  }

  @UseGuards(JwtGuard)
  @Delete(':deedId')
  async delete(
    @DecodedPayload() { id: userId }: JwtDecodedPayload,
    @Param('deedId') deedId: string,
  ): Promise<MessageResponse> {
    await this.deedsService.delete(userId, +deedId);
    return { message: 'Successfully deleted' };
  }
}
