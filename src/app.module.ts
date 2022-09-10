import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailService } from './email.service';
import { ScrappingService } from './scrapping.service';
import { TasksService } from './task.service';

@Module({
  imports: [ScheduleModule.forRoot(), ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ScrappingService, EmailService, TasksService],
})
export class AppModule {}
