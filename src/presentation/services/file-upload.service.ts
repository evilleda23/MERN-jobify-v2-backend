import fs from 'fs';
import path from 'path';
import { UploadedFile } from 'express-fileupload';

import { CustomError } from '../../domain';
import { Uuid } from '../../config';

export class FileUploadService {
  // DI
  constructor(private readonly uuid = Uuid.generate) {}

  private checkFolder(path: string) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ) {
    try {
      const fileExtension = file.mimetype.split('/').at(1) ?? '';
      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest(
          `Invalid file extension ${fileExtension}. Valid extensions are ${validExtensions}`
        );
      }
      const destination = path.resolve(__dirname, `../../../`, folder);
      const fileName = `${this.uuid()}.${fileExtension}`;
      this.checkFolder(destination);
      file.mv(`${destination}/${fileName}`);
      return { fileName };
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }

  async uploadMultiple(
    files: UploadedFile[],
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ) {
    const fileNames = await Promise.all(
      files.map((file) => this.uploadSingle(file, folder, validExtensions))
    );
    return fileNames;
  }
}
