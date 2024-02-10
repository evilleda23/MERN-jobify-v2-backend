import nodemailer, { Transporter } from 'nodemailer';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter: Transporter;

  constructor(
    private readonly mailerService: string,
    private readonly mailerEmail: string,
    private readonly mailerSecretKey: string,
    private postToProvider: boolean
  ) {
    this.transporter = nodemailer.createTransport({
      service: this.mailerService,
      auth: {
        user: this.mailerEmail,
        pass: this.mailerSecretKey,
      },
    });
  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;

    try {
      if (!this.postToProvider) return true;
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
