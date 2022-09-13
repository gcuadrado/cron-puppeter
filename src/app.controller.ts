import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from './email.service';
import InforProducto from './model/info-producto';
import { ScrappingService } from './scrapping.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly scrappingService: ScrappingService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  async getHello(): Promise<InforProducto[]> {
    const infoProducto = await this.scrappingService.getWebData();
    this.emailService.sendEmailDiario(infoProducto);
    return infoProducto;
  }
}
