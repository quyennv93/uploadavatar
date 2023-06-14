import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  async uploadAvatar(file: Express.Multer.File): Promise<string> {
    console.log('eeeeeeeeeeeeeee', file);
    return file.path;
}

async uploadBankLogo(files :{ image?: Express.Multer.File[]; shortLogo?: Express.Multer.File[] }): Promise<string> {
  
  return files.image[0].path;
}

async uploadProduct(file: Express.Multer.File): Promise<string> {
  console.log('eeeeeeeeeeeeeee', file);
  return file.path;
}
}
