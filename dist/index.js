"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const core_1 = require("@mikro-orm/core");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const hello_1 = require("./resolvers/hello");
const PORT = process.env.PORT || 3000;
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    const em = orm.em.fork();
    await orm.getMigrator().up();
    const app = (0, express_1.default)();
    const apolloServer = new server_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver],
            validate: false
        })
    });
    app.listen(PORT, () => {
        console.log(`server started on http://127.0.0.1:${PORT}`);
    });
};
main().catch(err => console.error('This err: ' + err));
//# sourceMappingURL=index.js.map