import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export function FileDecorator(fileName: string, dest: string) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fileName, {
        storage: diskStorage({
          destination: `${dest}`,
          filename(req, file, callback) {
            callback(null, file.originalname);
          },
        }),
      }),
    ),
  );
}
