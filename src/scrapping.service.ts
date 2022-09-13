import { Injectable } from '@nestjs/common';
import puppeteer, { Puppeteer } from 'puppeteer';
import InforProducto from './model/info-producto';

@Injectable()
export class ScrappingService {
  async getWebData(): Promise<InforProducto[]> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreDefaultArgs: ['--disable-extensions'],
    });
    const page = await browser.newPage();
    await page.goto(
      'https://www.lenovo.com/es/es/eseducation/laptops/ideapad/500-series/IdeaPad-5i-Gen-7-14-inch-Intel/p/LEN101I0061',
    );

    const button = await page.waitForSelector('#_evidon-banner-acceptbutton');
    button.click();
    const inputEstudiantes: any = await page.waitForSelector(
      'input[name="passcode"]',
    );
    await page.evaluate((x) => (x.value = 'ESTUDIANTES'), inputEstudiantes);
    await page.click('button[type=submit]');
    await page.waitForTimeout(5000);
    const infoProductoI7 = await this.getInfoProductoByModelName(
      '82SD004PSP',
      page,
    );
    const infoProductoI5 = await this.getInfoProductoByModelName(
      '82SD004NSP',
      page,
    );
    await browser.close();
    return [infoProductoI7, infoProductoI5];
  }

  async getInfoProductoByModelName(
    modelName: string,
    page: puppeteer.Page,
  ): Promise<InforProducto> {
    const tabProducto: any = await page.waitForSelector(
      `li[data-code="${modelName}"]`,
    );
    const precioElement: any = await tabProducto.waitForSelector('.saleprice');
    const precio: string = await page.evaluate(
      (x) => x.innerHTML,
      precioElement,
    );
    const btnAddCarrito: any = await page.waitForSelector(
      `button[data-productcode="${modelName}"]`,
    );
    const isDisabledI7: boolean = await page.evaluate(
      (x) => x.disabled,
      btnAddCarrito,
    );

    const infoProductoI7 = new InforProducto(modelName, precio, isDisabledI7);
    return infoProductoI7;
  }
}
