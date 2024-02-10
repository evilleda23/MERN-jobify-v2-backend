import express, { Router } from 'express';
import fileUpload from 'express-fileupload';
import colors from 'colors'; //* Do not remove this line
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import i18nextMiddleware from 'i18next-http-middleware';
import { i18nAdapter } from '../config/plugins/i18n.plugin';
import { envs } from '../config';
interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    const i18n = i18nAdapter.create(i18nextMiddleware.LanguageDetector);
    //* Middlewares
    if (envs.NODE_ENV === 'development') this.app.use(morgan('dev'));
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(cookieParser());
    this.app.use(
      i18nextMiddleware.handle(i18n, {
        removeLngFromUrl: false,
      })
    );

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );

    //* Routes
    this.app.use(this.routes);

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    this.app.get('*', (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
