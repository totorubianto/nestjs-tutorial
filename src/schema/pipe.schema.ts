import { Type } from '@nestjs/common';
export interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom';
  metatype?: Type<any>;
  data?: string;
}
