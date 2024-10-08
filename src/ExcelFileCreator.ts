import ExcelJS, { CellFormulaValue, CellValue, Workbook } from "exceljs";
import { Logger } from '@overnightjs/logger';

export class ExcelFileCreator {
  private workbook: ExcelJS.Workbook | undefined;

  constructor() { Logger.Info("erte"); }

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
    console.log(123);
    // Sample hierarchical data
    const worksheet = this.workbook!.addWorksheet('Test numeric values');
    const csvData = [
      { name: 'Company A', depth: 1 },
      { name: 'Sub A1', depth: 2 },
      { name: 'Sub A2', depth: 2 },
      { name: 'Company B', depth: 1 },
      { name: 'Sub B1', depth: 2 },
    ];

    // To store last outline level for controlling visibility
    let lastOutlineLevel = 0;

    // Add rows to the worksheet with correct outline levels
    csvData.forEach(row => {
      const newRow = worksheet.addRow(['http:\/\/row.name']);

      // Set the outline level based on the depth
      newRow.outlineLevel = row.depth;

      // Determine if this is a parent row and manage visibility
      if (row.depth === 1) {
        newRow.hidden = false; // Parent rows should be visible
      } else {
        newRow.hidden = true; // Subrows should be hidden initially
      }

      // Maintain the last outline level
      lastOutlineLevel = row.depth;
    });

    // Set row properties for proper collapsible functionality
    csvData.forEach((row, index) => {
      if (row.depth === 1) {
        // For each parent row, ensure it can expand/collapse its children
        const children = worksheet.getRow(index + 2); // +2: offset for 1-based row index +
        for (let i = index + 1; i < csvData.length; i++) {
          if (csvData[i].depth > row.depth) {
            children.hidden = true; // Initially hide children
            break;
          } else if (csvData[i].depth <= row.depth) {
            break; // Found next sibling, stop checking
          }
        }
      }
    });

    // Save the workbook
    this.workbook!.xlsx.writeFile('myTable.xlsx')
      .then(() => {
        console.log('Excel file created!');
      })
      .catch(error => {
        console.error('Error creating Excel file:', error);
      });
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
    // this.setupWorksheet();
    this.fillWorksheet();
    return this.workbook!;
  }

}