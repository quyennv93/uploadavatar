import { existsSync, mkdirSync } from 'node:fs';
import { extname } from 'node:path';
import { Logger } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const generateFileName = (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error, fileName: string) => void,
): void => {
    try {
        const extension = extname(file.originalname);
        const uniqueSuffix = `${uuidv4()}-${Date.now()}`;
        cb(null, `${uniqueSuffix}${extension}`);
    } catch (error) {
        const logger = new Logger('generateFileName');
        logger.error('Generating avartar name error', error);
    }
};

const generateDestination = (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error, destination: string) => void,
): void => {
    const uploadPath = 'public/uploads/avatar';
    // Create folder if doesn't exist
    if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
};

export const avatarOptions: MulterOptions = {
    storage: diskStorage({ destination: generateDestination, filename: generateFileName }),
};
