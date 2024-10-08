"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ExpressServer_1 = tslib_1.__importDefault(require("./ExpressServer"));
const exampleServer = new ExpressServer_1.default();
exampleServer.start();
