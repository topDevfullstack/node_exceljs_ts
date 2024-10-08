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
        const csvData = [
            { name: 'Company A', depth: 1 },
            { name: 'Sub A1', depth: 2 },
            { name: 'Sub A2', depth: 2 },
            { name: 'Company B', depth: 1 },
            { name: 'Sub B1', depth: 2 },
        ];
        // To maintain visibility control
        let parentRows = []; // Specify the type of elements in the array
        // Add rows to the worksheet with correct outline levels
        csvData.forEach((row, index) => {
            const newRow = worksheet.addRow([row.name]);
            // Set the outline level based on depth
            newRow.outlineLevel = row.depth;
            // Set hidden property based on depth to create collapsible functionality
            if (row.depth > 1) {
                newRow.hidden = true; // Initially hide sub rows
            }
            else {
                newRow.hidden = false; // Parent rows should be visible
                parentRows.push({ id: index + 1, name: row.name }); // Store the index (1-based) of parent rows
            }
        });
        // Manage visibility based on parent-child relationships
        parentRows.forEach((parentIndex) => {
            for (let i = parentIndex.id; i < csvData.length; i++) {
                if (csvData[i].depth > csvData[parentIndex.id - 1].depth) { // Only look at children
                    worksheet.getRow(i + 1).hidden = true; // Hide initially
                }
                else {
                    break; // Exit when reaching a sibling/next parent
                }
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
