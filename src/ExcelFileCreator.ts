import ExcelJS, { CellFormulaValue, CellValue, Workbook } from "exceljs";

export class ExcelFileCreator {
  private workbook: ExcelJS.Workbook | undefined;

  constructor() {}

  private setupWorkbook() {
    this.workbook = new ExcelJS.Workbook();
    this.workbook.creator = 'Vrakoss';
    this.workbook.lastModifiedBy = 'Vrakoss';
    this.workbook.created = new Date();
    this.workbook.modified = new Date();
    this.workbook.lastPrinted = new Date();
  }

  private setupWorksheet() {
    const worksheet = this.workbook!.addWorksheet('Test numeric values');
    worksheet.columns = [
      { header: 'Numeric values', key: 'values1', width: 15 },
      { header: 'Numeric values', key: 'values2', width: 15 },
      { header: 'Calculation result', key: 'result', width: 15 },
    ];
  }

  private fillWorksheet() {
    const worksheet = this.workbook!.getWorksheet('Test numeric values');
    const column1 = worksheet.getColumn('values1');
    const column2 = worksheet.getColumn('values2');
    const column3 = worksheet.getColumn('result');
    const column1Values = [1, 2, -3, 4, -5, 6];
    const column2Values = [1, -2, 3, -4, 5, 6];
    column1.values = column1.values.concat(column1Values);
    column2.values = column2.values.concat(column2Values);
    // fill column3 values with the formula
    column3.values = column3.values.concat(column1Values.map((e, i) => this.getFormulaCellValue(`A${i+2}`, `B${i+2}`, column1Values[i] + column2Values[i])));
  }

  private getFormulaCellValue(cellA: string, cellB: string, result: number): CellValue {
    return {
      formula: `=SUM(${cellA},${cellB})`,
      result: result,
      date1904: false,
    };
  }

  public getWorkbook(): Workbook {
    this.setupWorkbook();
    this.setupWorksheet();
    this.fillWorksheet();
    return this.workbook!;
  }

}