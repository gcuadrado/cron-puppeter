import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import InforProducto from './model/info-producto';

@Injectable()
export class ScrappingService {
  async getWebData(): Promise<InforProducto> {
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
    const tabProducto: any = await page.waitForSelector(
      'li[data-code="82SD004PSP"]',
    );
    const precioElement: any = await tabProducto.waitForSelector('.saleprice');
    const precio: string = await page.evaluate(
      (x) => x.innerHTML,
      precioElement,
    );
    const btnAddCarrito: any = await page.waitForSelector(
      'button[data-productcode="82SD004PSP"]',
    );
    const isDisabled: boolean = await page.evaluate(
      (x) => x.disabled,
      btnAddCarrito,
    );
    await browser.close();
    return new InforProducto(precio, isDisabled);
  }
}
