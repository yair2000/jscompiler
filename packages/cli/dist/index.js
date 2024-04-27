#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const serve_1 = require("./serve");
// Command list for the CLI
commander_1.program.addCommand(serve_1.serveCommand);
commander_1.program.parse(process.argv);
