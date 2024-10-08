"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelFileCreator = void 0;
const tslib_1 = require("tslib");
const exceljs_1 = tslib_1.__importDefault(require("exceljs"));
const logger_1 = require("@overnightjs/logger");
class ExcelFileCreator {
    constructor() {
        logger_1.Logger.Info("Creating Excel file instance");
        this.setupWorkbook();
        this.fillWorksheet();
    }
    setupWorkbook() {
        this.workbook = new exceljs_1.default.Workbook();
        this.workbook.creator = 'Vrakoss';
        this.workbook.lastModifiedBy = 'Vrakoss';
        this.workbook.created = new Date();
        this.workbook.modified = new Date();
        this.workbook.lastPrinted = new Date();
    }
    fillWorksheet() {
        const worksheet = this.workbook.addWorksheet('Test numeric values');
        // Set page setup options
        worksheet.pageSetup = {
            paperSize: 9, // A4
            orientation: 'landscape',
            fitToPage: true,
            fitToHeight: 1,
            fitToWidth: 1,
            margins: {
                left: 0.5,
                right: 0.5,
                top: 0.5,
                bottom: 0.5,
                header: 0,
                footer: 0
            }
        };
        // Set outline settings to have summary rows above detail rows
        // worksheet.outline = {
        //   summaryBelow: false, // Set to false for summary rows above detail
        // };
        const csvData = [
            { name: 'Company A', depth: 1 },
            { name: 'Sub A1', depth: 2 },
            { name: 'Sub A2', depth: 2 },
            { name: 'Company B', depth: 1 },
            { name: 'Sub B1', depth: 2 },
        ];
        // Add rows to the worksheet with correct outline levels
        csvData.forEach((row, index) => {
            const newRow = worksheet.addRow([row.name, row.depth]);
            // Set the outline level based on depth
            newRow.outlineLevel = row.depth - 1;
            // Set hidden property based on depth to create collapsible functionality
            if (row.depth > 1) {
                newRow.hidden = true; // Initially hide sub rows
            }
            else {
                newRow.hidden = false; // Parent rows should be visible
            }
        });
        // Save the workbook
        this.workbook.xlsx.writeFile('myTable.xlsx')
            .then(() => {
            console.log('Excel file created!');
        })
            .catch(error => {
            console.error('Error creating Excel file:', error);
        });
    }
    getWorkbook() {
        return this.workbook;
    }
}
exports.ExcelFileCreator = ExcelFileCreator;
