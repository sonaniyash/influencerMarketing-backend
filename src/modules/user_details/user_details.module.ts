/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserDetailsController } from './user_details.controllers';
import { UserDetailsService } from './user_details.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [UserDetailsController],
  providers: [UserDetailsService],
  exports: [UserDetailsService],
})
export class UserDetailsModule {}
