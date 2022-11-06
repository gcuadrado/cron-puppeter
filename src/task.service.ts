import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';
import { EmailService } from './email.service';
import { ScrappingService } from './scrapping.service';
import { SepeScrappingService } from './sepe-scrapping/sepe-scrapping.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly appService: AppService,
    private readonly scrappingService: ScrappingService,
    private readonly emailService: EmailService,
    private readonly sepeService: SepeScrappingService,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  // @Cron(CronExpression.EVERY_2_HOURS)
  // async handleCron() {
  //   this.logger.debug('Called every 2 hours');
  //   const infoProductos = await this.scrappingService.getWebData();
  //   const infoI7 = infoProductos.find((i) => i.modelName === '82SD004PSP');
  //   if (!infoI7.isAgotado)
  //     await this.emailService.sendEmailAlertaDisponible(infoI7);
  // }

  // @Cron(CronExpression.EVERY_DAY_AT_3PM)
  // async handleCronDaily() {
  //   this.logger.debug('Called every day at 3PM');
  //   const infoProductos = await this.scrappingService.getWebData();
  //   await this.emailService.sendEmailDiario(infoProductos);
  // }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleSepeCron() {
    this.logger.debug('Called every 10 minutes');
    const responseSepe = await this.sepeService.getHorariosSepe();
    await this.emailService.sendEmailSepe(responseSepe);
  }
}
