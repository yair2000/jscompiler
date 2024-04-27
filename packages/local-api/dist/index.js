"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const cell_routes_1 = require("./cell-routes");
const serve = (port, filename, dir, useProxy) => {
    const app = (0, express_1.default)();
    app.use((0, cell_routes_1.createCellsRouter)(filename, dir));
    if (useProxy) { // Local development
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: "http://127.0.0.1:3000",
            ws: true,
            logLevel: "silent"
        }));
    }
    else { // Run the project on another person's computer
        const packagePath = require.resolve("local-client/build/index.html");
        app.use(express_1.default.static(path_1.default.dirname(packagePath)));
    }
    // Prints a success or error message of the server
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    });
};
exports.serve = serve;
