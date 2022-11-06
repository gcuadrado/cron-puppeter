import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import InforProducto from './model/info-producto';
import { ResponseSepe } from './model/response-sepe';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  async sendEmailAlertaDisponible(infoProducto: InforProducto): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_EMAIL'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: this.configService.get<string>('SMTP_EMAIL'),
      to: this.configService.get<string>('SMTP_TO_EMAIL'),
      subject: 'Alerta PC disponible',
      html: `Está disponible a: ${infoProducto.precio} 
      <a href="https://www.lenovo.com/es/es/eseducation/laptops/ideapad/500-series/IdeaPad-5i-Gen-7-14-inch-Intel/p/LEN101I0061">
      https://www.lenovo.com/es/es/eseducation/laptops/ideapad/500-series/IdeaPad-5i-Gen-7-14-inch-Intel/p/LEN101I0061
      </a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  async sendEmailDiario(infoProductos: InforProducto[]): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_EMAIL'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const html = infoProductos.map((info) => {
      return `${info.isAgotado ? 'AGOTADO' : 'DISPONIBLE'}-Modelo: ${
        info.modelName
      } a ${info.precio}<br>`;
    });

    const mailOptions = {
      from: this.configService.get<string>('SMTP_EMAIL'),
      to: this.configService.get<string>('SMTP_TO_EMAIL'),
      subject: 'Informe diario web Lenovo',
      html: html.join(''),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  async sendEmailSepe(responseSepe: ResponseSepe): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_EMAIL'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let html: string = null;
    if (responseSepe != null) {
      const oficinaConCita = responseSepe.listaOficina.find(
        (oficina) =>
          oficina.primerHuecoDisponible !== '' ||
          oficina.primerHuecoDisponibleDependiente !== '',
      );
      if (oficinaConCita)
        html = `La oficina: ${oficinaConCita.oficina} tiene un hueco libre: ${
          oficinaConCita.primerHuecoDisponible
            ? oficinaConCita.primerHuecoDisponible
            : oficinaConCita.primerHuecoDisponibleDependiente
        }`;
      else html = 'No hay oficinas con citas disponibles';
    } else html = 'Error al realizar fetch';

    const mailOptions = {
      from: this.configService.get<string>('SMTP_EMAIL'),
      to: this.configService.get<string>('SMTP_TO_EMAIL'),
      subject: 'Informe sepe',
      html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
