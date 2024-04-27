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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCellsRouter = void 0;
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const createCellsRouter = (filename, dir) => {
    const router = express_1.default.Router();
    router.use(express_1.default.json());
    const fullPath = path_1.default.join(dir, filename);
    router.get("/cells", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.setHeader('Cache-Control', 'no-store');
        const isLocalApiError = (err) => {
            return typeof err.code === "string";
        };
        try {
            const result = yield promises_1.default.readFile(fullPath, { encoding: "utf-8" });
            res.send(JSON.parse(result));
        }
        catch (err) {
            if (isLocalApiError(err)) {
                if (err.code === "ENOENT") { // ENOENT - The error indicating that a file doesn't exist
                    // Creates a file with default cells
                    yield promises_1.default.writeFile(fullPath, "[]", "utf-8");
                    res.send([]);
                }
            }
            else {
                throw err;
            }
        }
    }));
    router.post("/cells", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { cells } = req.body;
            // File path, data, encoding type
            yield promises_1.default.writeFile(fullPath, JSON.stringify(cells), "utf-8");
            res.status(200).json({ status: "OK" });
        }
        catch (err) {
            console.error("Error occurred while saving cells:", err);
            res.status(500).json({ error: "Failed to save cells" });
        }
    }));
    return router;
};
exports.createCellsRouter = createCellsRouter;
