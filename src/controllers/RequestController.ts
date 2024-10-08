import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { ExcelFileCreator } from '../ExcelFileCreator';

@Controller('excel')
export class RequestController {

  @Get()
  private getExcel(req: Request, res: Response) {
      Logger.Info("Sending excel file");
      // create workbook
      const excelSupplier = new ExcelFileCreator();
      const workbook = excelSupplier.getWorkbook();

      // set Header
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=' + 'test.xlsx');
      // send workbook
      workbook.xlsx.write(res).then(() => {
        res.status(200).end();
      });
  }
}