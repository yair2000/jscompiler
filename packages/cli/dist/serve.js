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
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const local_api_1 = require("local-api");
const isProduction = process.env.NODE_ENV === "production";
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]") // Command name
    .description("Open a file for editing") // Command description
    .option("-p, --port <number>", "Port to run the server", "4000") // Open the file in a port of your choice
    .action((...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filename = "cells.js", options) {
    const isLocalApiError = (err) => {
        return typeof err.code === "string";
    };
    try {
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        yield (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir, !isProduction);
        console.log(`Opened ${filename}. Go to http://localhost:${options.port} to edit the file`);
    }
    catch (err) {
        if (isLocalApiError(err)) {
            if (err.code === "EADDRINUSE") {
                console.error("This port is already used. Try using a different one");
            }
        }
        else if (err instanceof Error) {
            console.log("Error: ", err.message);
        }
        process.exit(1);
    }
}));
