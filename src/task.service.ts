import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';
import { EmailService } from './email.service';
import { ScrappingService } from './scrapping.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly appService: AppService,
    private readonly scrappingService: ScrappingService,
    private readonly emailService: EmailService,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_2_HOURS)
  async handleCron() {
    this.logger.debug('Called every 2 hours');
    const infoProducto = await this.scrappingService.getWebData();
    await this.emailService.getWebData(infoProducto);
  }
}
