"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bodyParser = tslib_1.__importStar(require("body-parser"));
const controllers = tslib_1.__importStar(require("./controllers"));
const path_1 = tslib_1.__importDefault(require("path"));
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
class ExpressServer extends core_1.Server {
    constructor() {
        super(true);
        this.HOSTNAME = '127.0.0.1';
        this.PORT = 5000;
        this.SERVER_STARTED_MSG = `Express server started at: http://${this.HOSTNAME}:${this.PORT}/`;
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.setupControllers();
    }
    setupControllers() {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = controllers[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }
    start() {
        this.app.get('*', (req, res) => {
            res.sendFile('index.html', { root: path_1.default.join(__dirname, '../src/public') });
        });
        this.app.listen(this.PORT, () => {
            logger_1.Logger.Imp(this.SERVER_STARTED_MSG);
        });
    }
}
exports.default = ExpressServer;
