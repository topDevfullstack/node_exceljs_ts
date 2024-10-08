"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const ExcelFileCreator_1 = require("../ExcelFileCreator");
let RequestController = class RequestController {
    getExcel(req, res) {
        logger_1.Logger.Info("Sending excel file");
        // create workbook
        const excelSupplier = new ExcelFileCreator_1.ExcelFileCreator();
        const workbook = excelSupplier.getWorkbook();
        // set Header
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'test.xlsx');
        // send workbook
        workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    }
};
exports.RequestController = RequestController;
tslib_1.__decorate([
    (0, core_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RequestController.prototype, "getExcel", null);
exports.RequestController = RequestController = tslib_1.__decorate([
    (0, core_1.Controller)('excel')
], RequestController);
