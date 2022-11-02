import { Module } from "@nestjs/common";
import { PDFController } from "./pdf.controller";
import { PDFService } from "./pdf.service";
import { GridFsMulterConfigService } from "src/Interceptor/GridFs";
import { MulterModule } from '@nestjs/platform-express';


@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: GridFsMulterConfigService,
        }),
    ],
    controllers: [PDFController],
    providers: [PDFService,GridFsMulterConfigService]
})
export class PDFModule { }