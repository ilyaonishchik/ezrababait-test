import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { DeedsService } from './deeds.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DecodedPayload } from 'src/auth/decorators/decoded-payload.decorator';
import { JwtDecodedPayload } from 'src/auth/models/jwt-decoded-payload';
import { Deed } from './models/deed.entity';
import { CreateDeedDto } from './models/create-deed.dto';
import { MessageResponse } from 'src/_shared/message.response';
import { UpdateDeedDto } from './models/update-deed.dto';
import { PaginatedResponse } from 'src/_shared/paginated.response';

@Controller('users/:userId/deeds')
export class DeedsController {
  constructor(private deedsService: DeedsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createDeed(
    @DecodedPayload() { id: decodedId }: JwtDecodedPayload,
    @Param('userId') userId: string,
    @Body() createDeedDto: CreateDeedDto,
  ): Promise<Deed> {
    return await this.deedsService.createDeed(decodedId, +userId, createDeedDto);
  }

  @Get()
  async getUserDeeds(
    @Param('userId') userId: string,
    @Query('page') page: string | undefined,
    @Query('take') take: string | undefined,
  ): Promise<PaginatedResponse<Deed>> {
    return await this.deedsService.getUserDeeds(+userId, +page, +take);
  }

  @UseGuards(JwtGuard)
  @Put(':deedId')
  async updateDeed(
    @DecodedPayload() { id: decodedId }: JwtDecodedPayload,
    @Param('userId') userId: string,
    @Param('deedId') deedId: string,
    @Body() updateDeedDto: UpdateDeedDto,
  ): Promise<MessageResponse> {
    await this.deedsService.updateDeed(decodedId, +userId, +deedId, updateDeedDto);
    return { message: `Deed with id ${deedId} successfully updated` };
  }

  @UseGuards(JwtGuard)
  @Delete(':deedId')
  async deleteDeed(
    @DecodedPayload() { id: decodedId }: JwtDecodedPayload,
    @Param('userId') userId: string,
    @Param('deedId') deedId: string,
  ): Promise<MessageResponse> {
    await this.deedsService.deleteDeed(decodedId, +userId, +deedId);
    return { message: `Deed with id ${deedId} successfully deleted` };
  }
}
