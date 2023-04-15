import nodemailer from 'nodemailer';
import HandlebarsMailTemplate, {
  IParseMailTemplate,
} from './HandlebarsMailTemplate';
import mailConfig from './mail';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

class SERVERMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: process.env.SERVER_SMTP_URL,
      port: Number(process.env.SERVER_SMTP_PORT),
      auth: {
        user: process.env.SERVER_ACCESS_KEY,
        pass: process.env.SERVER_SECRET_ACCESS_KEY,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const { email, name } = mailConfig.defaults.from;

    const message = transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
  }
}

export default SERVERMail;
