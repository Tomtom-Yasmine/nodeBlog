"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.hashPassword = exports.comparePassword = exports.protect = exports.createJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt = __importStar(require("bcrypt"));
var createJWT = function (user) {
    var token = jsonwebtoken_1["default"].sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    return token;
};
exports.createJWT = createJWT;
var protect = function (req, res, next) {
    var bearer = req.headers.authorization;
    if (!bearer) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    var _a = bearer.split(' '), token = _a[1];
    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        if (typeof process.env.JWT_SECRET !== 'string') {
            return res.status(401).json({ message: 'Not authorized' });
        }
        var payload = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET);
        req.user = payload;
        return next();
    }
    catch (e) {
        return res.status(401).json({ message: 'Not authorized' });
    }
};
exports.protect = protect;
var comparePassword = function (password, hash) {
    return bcrypt.compare(password, hash);
};
exports.comparePassword = comparePassword;
var hashPassword = function (password) {
    return bcrypt.hash(password, 10);
};
exports.hashPassword = hashPassword;
//# sourceMappingURL=auth.js.map