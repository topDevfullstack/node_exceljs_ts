"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelFileCreator = void 0;
const tslib_1 = require("tslib");
const exceljs_1 = tslib_1.__importDefault(require("exceljs"));
class ExcelFileCreator {
    constructor() { }
    setupWorkbook() {
        this.workbook = new exceljs_1.default.Workbook();
        this.workbook.creator = 'Vrakoss';
        this.workbook.lastModifiedBy = 'Vrakoss';
        this.workbook.created = new Date();
        this.workbook.modified = new Date();
        this.workbook.lastPrinted = new Date();
    }
    setupWorksheet() {
        const worksheet = this.workbook.addWorksheet('Test numeric values');
        worksheet.columns = [
            { header: 'Numeric values', key: 'values1', width: 15 },
            { header: 'Numeric values', key: 'values2', width: 15 },
            { header: 'Calculation result', key: 'result', width: 15 },
        ];
    }
    fillWorksheet() {
        const worksheet = this.workbook.getWorksheet('Test numeric values');
        const column1 = worksheet.getColumn('values1');
        const column2 = worksheet.getColumn('values2');
        const column3 = worksheet.getColumn('result');
        const column1Values = [1, 2, -3, 4, -5, 6];
        const column2Values = [1, -2, 3, -4, 5, 6];
        column1.values = column1.values.concat(column1Values);
        column2.values = column2.values.concat(column2Values);
        // fill column3 values with the formula
        column3.values = column3.values.concat(column1Values.map((e, i) => this.getFormulaCellValue(`A${i + 2}`, `B${i + 2}`, column1Values[i] + column2Values[i])));
    }
    getFormulaCellValue(cellA, cellB, result) {
        return {
            formula: `=SUM(${cellA},${cellB})`,
            result: result,
            date1904: false,
        };
    }
    getWorkbook() {
        this.setupWorkbook();
        this.setupWorksheet();
        this.fillWorksheet();
        return this.workbook;
    }
}
exports.ExcelFileCreator = ExcelFileCreator;
