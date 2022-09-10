import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import InforProducto from './model/info-producto';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  async getWebData(infoProducto: InforProducto): Promise<void> {
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
      html: `Está disponible a: ${infoProducto.precio}`,
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
