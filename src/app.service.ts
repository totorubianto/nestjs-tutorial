import { Injectable } from '@nestjs/common';
import { Item } from './items/interfaces/item.interface';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
