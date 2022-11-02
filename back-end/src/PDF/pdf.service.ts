import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { InjectConnection } from '@nestjs/mongoose'
import { Connection, Types } from 'mongoose'
import { IGridFSWriteOption, MongoGridFS } from 'mongo-gridfs'
import { GridFSBucketReadStream } from 'mongodb'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PDFEntity } from './pdf.entity';
import { FileInfoVm } from './FileInfoVM';


@Injectable()
export class PDFService {
    private fileModel: MongoGridFS;
    constructor(

        @InjectConnection() private readonly connection: Connection
    ) { this.fileModel = new MongoGridFS(this.connection.db, 'fs'); }

    async readStream(id: string): Promise<GridFSBucketReadStream> {
        return await this.fileModel.readFileStream(id);
    }

    async findInfo(id: string): Promise<FileInfoVm> {
        const result = await this.fileModel
            .findById(id).catch(err => { throw new HttpException('File not found', HttpStatus.NOT_FOUND) })
            .then(result => result)
            // console.log();
            
        return {
            filename: result.filename,
            length: result.length,
            chunkSize: result.chunkSize,
            md5: result.md5,
            contentType: result.contentType
        }
    }

    async deleteFile(id: string): Promise<boolean> {
        return await this.fileModel.delete(id)
    }
}