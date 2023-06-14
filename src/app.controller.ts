import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AppService } from './app.service';
import { avatarOptions } from './utils/avatar.util';
import { bankLogoOptions } from './utils/bank-logo.util';
import { productOptions } from './utils/product.util';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('avatar')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', avatarOptions))
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async uploadAvatar(@UploadedFile() file: Express.Multer.File): Promise<string> {
        return this.appService.uploadAvatar(file);
    }

    @Post('bank-logo')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'image', maxCount: 1 },
                { name: 'shortLogo', maxCount: 1 },
            ],
            productOptions,
        ),
    )
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async uploadBankLogo(@UploadedFiles() files: { image?: Express.Multer.File[]; shortLogo?: Express.Multer.File[] }): Promise<string> {
        return this.appService.uploadBankLogo(files);
    }

    @Post('product')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', productOptions))
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async uploadProduct(@UploadedFile() file: Express.Multer.File): Promise<string> {
        return this.appService.uploadProduct(file);
    }
}
