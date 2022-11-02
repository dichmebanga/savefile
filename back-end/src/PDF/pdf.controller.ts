import { Controller, Get, Param, Post, UseInterceptors, UploadedFiles, Response, UploadedFile, HttpException, HttpStatus } from "@nestjs/common";
import { PDFService } from "./pdf.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileResponseVm } from "./FileResponseVM";

@Controller('pdf')
@ApiTags('Attachments')
export class PDFController {
    constructor(private pdfService: PDFService) { }

    @Post('/upload')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('file'))
    async upload(@UploadedFiles() files) {
        const response = [];
        await files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                id: file.id,
                filename: file.filename,
                metadata: file.metadata,
                bucketName: file.bucketName,
                chunkSize: file.chunkSize,
                size: file.size,
                md5: file.md5,
                uploadDate: file.uploadDate,
                contentType: file.contentType,
            };
            response.push(fileReponse);
        });
        console.log(response);
        return response

    }

    @Get('/upload/:id')
    async getFile(@Param('id') id: string, @Response() res) {
        const file = await this.pdfService.findInfo(id)
        const filestream = await this.pdfService.readStream(id)
        
        if (!filestream) {
            throw new HttpException('Lỗi Truy Xuất File', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType);
        return filestream.pipe(res)
    }
}