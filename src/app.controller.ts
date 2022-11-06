import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from './email.service';
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
  ) {}

  @Get()
  async getHello(): Promise<ResponseSepe> {
    const infoProducto = await this.sepeService.getHorariosSepe();
    this.emailService.sendEmailSepe(infoProducto);
    return infoProducto;
  }
}
