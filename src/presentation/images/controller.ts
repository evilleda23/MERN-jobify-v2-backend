import { Request, Response } from 'express';

import fs from 'fs';
import path from 'path';
import { HttpResponse } from '../shared';

export class ImagesController {
  // DI
  constructor() {}

  getImage = (req: Request, res: Response) => {
    const { type = '', image = '' } = req.params;

    const imagePath = path.resolve(
      __dirname,
      `../../../uploads/${type}/${image}`
    );
    if (!fs.existsSync(imagePath)) {
      return HttpResponse.create(res, 404, 'images.notFound');
    }
    res.sendFile(imagePath);
  };
}
