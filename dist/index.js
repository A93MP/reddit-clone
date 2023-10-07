"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const express_1 = __importDefault(require("express"));
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const PORT = process.env.PORT || 3000;
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    const em = orm.em.fork();
    await orm.getMigrator().up();
    const app = (0, express_1.default)();
    app.get('/', (_, res) => {
        res.send('Hello World from express');
    });
    app.listen(PORT, () => {
        console.log(`server started on http://127.0.0.1:${PORT}`);
    });
};
main().catch(err => console.error('This err: ' + err));
//# sourceMappingURL=index.js.map