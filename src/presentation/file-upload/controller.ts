import { Request, Response } from 'express';

import { FileUploadService } from '../services/file-upload.service';
import { UploadedFile } from 'express-fileupload';
import { HttpResponse, handleError } from '../shared';
import { LogDatasource } from '../../domain/datasources/log.datasource';

export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUploadService,
    private readonly logService: LogDatasource
  ) {}

  uploadFile = (req: Request, res: Response) => {
    const type = req.params.type;

    const file = req.body.files.at(0) as UploadedFile;
    this.fileUploadService
      .uploadSingle(file, `uploads/${type}`)
      .then((file) => HttpResponse.create(res, 201, 'images.upload', { file }))
      .catch((error) =>
        handleError(
          error,
          res,
          `${this.constructor.name}.uploadFile`,
          this.logService
        )
      );
  };

  uploadMutipleFiles = (req: Request, res: Response) => {
    const type = req.params.type;

    const files = req.body.files as UploadedFile[];
    this.fileUploadService
      .uploadMultiple(files, `uploads/${type}`)
      .then((uploadedFiles) =>
        HttpResponse.create(res, 201, 'images.upload', { uploadedFiles })
      )
      .catch((error) =>
        handleError(
          error,
          res,
          `${this.constructor.name}.uploadMutipleFiles`,
          this.logService
        )
      );
  };
}
