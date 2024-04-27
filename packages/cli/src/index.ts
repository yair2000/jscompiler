#!/usr/bin/env node
import { program } from "commander";
import { serveCommand } from "./serve";

// Command list for the CLI
program.addCommand(serveCommand);
program.parse(process.argv);