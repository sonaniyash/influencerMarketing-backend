/* eslint-disable prettier/prettier */
import { Get, Controller, Query, NotFoundException } from '@nestjs/common';
import { UserDetailsService } from './user_details.service';

@Controller('user')
export class UserDetailsController {
  constructor(private readonly userService: UserDetailsService) {}

  @Get()
  async userDetails(@Query('search') search: string) {
    if (!search) {
      throw new NotFoundException(`Search query parameter not find`);
    }
    return this.userService.userDetails(search);
  }

  @Get('/post')
  async postDetails(@Query('search') search: string) {
    if (!search) {
      throw new NotFoundException(`Search query parameter not find`);
    }
    return this.userService.postDetails(search);
  }

  @Get('/contact')
  async contactDetails(@Query('search') search: string) {
    if (!search) {
      throw new NotFoundException(`Search query parameter not find`);
    }
    return this.userService.contactDetails(search);
  }
}
