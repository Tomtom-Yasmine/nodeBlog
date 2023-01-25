"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.updateToDoList = exports.deleteToDoList = exports.getToDoLists = exports.createToDoList = void 0;
var db_1 = __importDefault(require("../db"));
var createToDoList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todo, e_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.name)) {
                    throw new Error('Invalid body provided');
                }
                return [4 /*yield*/, db_1["default"].todoList.create({
                        data: {
                            name: req.body.name,
                            userId: req.user.id
                        }
                    })];
            case 1:
                todo = _b.sent();
                if (!todo) {
                    return [2 /*return*/, res.status(500).json({ error: "To do list creation failed" })];
                }
                return [2 /*return*/, res.status(201).json({ todo: todo })];
            case 2:
                e_1 = _b.sent();
                res.status(500).json({ error: e_1 === null || e_1 === void 0 ? void 0 : e_1.toString() });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createToDoList = createToDoList;
var getToDoLists = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todoLists, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1["default"].todoList.findMany({ where: { userId: req.user.id } })];
            case 1:
                todoLists = _a.sent();
                if (!todoLists) {
                    return [2 /*return*/, res.status(500).json({ error: "To do list fetch failed" })];
                }
                return [2 /*return*/, res.status(200).json({ message: todoLists })];
            case 2:
                e_2 = _a.sent();
                res.status(500).json({ error: e_2 === null || e_2 === void 0 ? void 0 : e_2.toString() });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getToDoLists = getToDoLists;
var deleteToDoList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todoList, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db_1["default"].todoList.findUnique({ where: { id: req.params.id } })];
            case 1:
                todoList = _a.sent();
                if (!todoList) {
                    return [2 /*return*/, res.status(404).json({ error: "To do list not found" })];
                }
                if (!(todoList.userId === req.user.id)) {
                    return [2 /*return*/, res.status(403).json({ error: "To do list access denied (forbidden)" })];
                }
                return [4 /*yield*/, db_1["default"].todoList["delete"]({ where: { id: req.params.id } })];
            case 2:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, res.status(500).json({ error: "To do list deleted failed" })];
                }
                return [2 /*return*/, res.status(200).json({ message: "To do List deleted successfully " })];
            case 3:
                e_3 = _a.sent();
                res.status(500).json({ error: e_3 === null || e_3 === void 0 ? void 0 : e_3.toString() });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteToDoList = deleteToDoList;
var updateToDoList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todoList, name, result, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db_1["default"].todoList.findUnique({ where: { id: req.params.id } })];
            case 1:
                todoList = _a.sent();
                name = req.body.name;
                if (!todoList) {
                    return [2 /*return*/, res.status(404).json({ error: "To do list not found" })];
                }
                if (!(todoList.userId === req.user.id)) {
                    return [2 /*return*/, res.status(403).json({ error: "To do list access denied (forbidden)" })];
                }
                return [4 /*yield*/, db_1["default"].todoList.update({
                        where: {
                            id: req.params.id
                        },
                        data: {
                            name: name
                        }
                    })];
            case 2:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, res.status(500).json({ error: "To do list update failed" })];
                }
                return [2 /*return*/, res.status(200).json({ message: "To do List updated successfully " })];
            case 3:
                e_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: e_4 === null || e_4 === void 0 ? void 0 : e_4.toString() })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateToDoList = updateToDoList;
//# sourceMappingURL=todo.js.map