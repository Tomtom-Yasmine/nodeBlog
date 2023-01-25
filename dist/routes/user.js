"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var app = express_1["default"].Router();
app.get('/user', function (req, res) {
    res.status(200).json({ message: 'Hello user' });
});
exports["default"] = app;
//# sourceMappingURL=user.js.map