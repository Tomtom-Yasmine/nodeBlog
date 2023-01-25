"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
var lodash_merge_1 = __importDefault(require("lodash.merge"));
(_a = process.env).NODE_ENV || (_a.NODE_ENV = 'development');
var stage = process.env.STAGE || "local";
var envConfig;
if (stage === "production") {
    envConfig = require("./production")["default"];
}
else if (stage === "staging") {
    envConfig = require("./staging")["default"];
}
else {
    envConfig = require("./local")["default"];
}
exports["default"] = (0, lodash_merge_1["default"])({
    stage: stage,
    env: process.env.NODE_ENV,
    port: 3001,
    secrets: {
        jwt: process.env.JWT_SECRET,
        dbUrl: process.env.DATABASE_URL
    }
}, envConfig);
//# sourceMappingURL=index.js.map