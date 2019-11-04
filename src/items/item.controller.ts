import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
  HttpException,
  HttpStatus,
  SetMetadata,
  UseFilters,
  UsePipes,
  UseGuards,
  Res,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './item.services';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './interfaces/item.interface';
import { HttpExceptionFilter } from './../common/http-exception.filter';
import { ForbiddenException } from './../common/forbidden.exception';
import { ValidationPipe } from './../common/validation.pipe';
import { ItemSchema } from './schemas/item.schemas';
import { RolesGuard } from '../common/role.guard';
import { Roles } from '../common/roles.decorator';
import { LoggingInterceptor } from '../common/logging.interceptor';
import { TransformInterceptor } from '../common/transform.interceptor';
import { ErrorsInterceptor } from '../common/errors.interceptor';
import { CacheInterceptor } from '../common/cache.interceptor';
import { TimeoutInterceptor } from '../common/timeout.interceptor';
import { User } from '../common/custom.decoration';
@Controller()
@UseInterceptors(TransformInterceptor)
@UseInterceptors(LoggingInterceptor)
// @UseInterceptors(ErrorsInterceptor)
// @UseInterceptors(CacheInterceptor)
// @UseInterceptors(TimeoutInterceptor)
@UseGuards(RolesGuard)
@UsePipes(ValidationPipe)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('item')
  @Roles('admin')
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }
  @Post('customdecor')
  @Roles('admin')
  createa(@User(['firstName', 'lastName', 'add']) body, @Request() req) {
    console.log(req.body);
    return body;
  }
  @Get('item/exception')
  exception(): Promise<Item[]> {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
  @Get('item/exception1')
  exception1(): Promise<Item[]> {
    throw new ForbiddenException();
  }
  @Get('item/custom-exception')
  async customException() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      403,
    );
  }

  @Get('item/:id')
  @Roles('asdas')
  findOne(@Param('id') id): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Post('item')
  @Roles('admin')
  create(@Body() createItemDto: CreateItemDto) {
    console.log(createItemDto);
    return this.itemService.create(createItemDto);
  }
  @Post('item/exception')
  @UseFilters(new HttpExceptionFilter())
  createException(@Body() createItemDto: CreateItemDto): Promise<Item> {
    throw new ForbiddenException();
  }

  @Delete('item/:id')
  delete(@Param('id') id): Promise<Item> {
    return this.itemService.delete(id);
  }

  @Put('item/:id')
  update(@Body() updateItemDto: CreateItemDto, @Param('id') id): Promise<Item> {
    return this.itemService.update(id, updateItemDto);
  }
}
