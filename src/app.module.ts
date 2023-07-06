import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserDetailsModule } from './modules/user_details/user_details.module';
import { AppService } from './app.service';

@Module({
  imports: [UserDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
