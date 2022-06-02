"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exitProcess = (exitCode = 1, error) => {
    if (error)
        console.error(error);
    return process.exit(exitCode);
};
exports.default = exitProcess;
