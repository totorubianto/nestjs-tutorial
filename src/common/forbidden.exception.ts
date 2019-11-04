import { HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
