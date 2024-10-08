import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import path from 'path';

import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

class ExpressServer extends Server {
  private readonly HOSTNAME = '127.0.0.1';
  private readonly PORT = 5000;
  private readonly SERVER_STARTED_MSG = `Express server started at: http://${this.HOSTNAME}:${this.PORT}/`;

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
    }

    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }

    public start(): void {
        this.app.get('*', (req, res) => {
            res.sendFile('index.html', {root: path.join(__dirname, '../src/public')});
        });
        this.app.listen(this.PORT, () => {
            Logger.Imp(this.SERVER_STARTED_MSG);
        });
    }
}

export default ExpressServer;