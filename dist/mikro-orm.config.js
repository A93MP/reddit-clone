"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}'
    },
    entities: [Post_1.Post],
    host: '127.0.0.1',
    user: 'postgres',
    password: '3438',
    dbName: 'redditclone',
    type: 'postgresql',
    debug: !constants_1.__prod__
};
//# sourceMappingURL=mikro-orm.config.js.map