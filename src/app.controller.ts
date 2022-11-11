import { Body, Controller, Get, Post } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronTime } from 'cron';
import { AppService } from './app.service';
import { EmailService } from './email.service';
import CronExpression from './model/cron-expression';
import InforProducto from './model/info-producto';
import { ResponseSepe } from './model/response-sepe';
import { ScrappingService } from './scrapping.service';
import { SepeScrappingService } from './sepe-scrapping/sepe-scrapping.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly scrappingService: ScrappingService,
    private readonly emailService: EmailService,
    private readonly sepeService: SepeScrappingService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Get()
  async getHello(): Promise<ResponseSepe> {
    const infoProducto = await this.sepeService.getHorariosSepe();
    this.emailService.sendEmailSepe(infoProducto);
    return infoProducto;
  }

  @Post()
  async setSepePeriod(
    @Body() cronExpression: CronExpression,
  ): Promise<boolean> {
    const sepeJob = this.schedulerRegistry.getCronJob('sepe');
    sepeJob.setTime(new CronTime(cronExpression.expression));
    return true;
  }
}
