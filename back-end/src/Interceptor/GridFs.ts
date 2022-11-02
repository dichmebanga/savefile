import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import {GridFsStorage} from 'multer-gridfs-storage';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
    gridFsStorage: any;
    constructor() {
        this.gridFsStorage = new GridFsStorage({
            url: 'mongodb://127.0.0.1:27017/file',
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    const filename = file.originalname.trim();
                    const fileInfo = {
                      filename: filename
                    };
                    resolve(fileInfo);
                });
              }
        });
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage,
        };
    }
}