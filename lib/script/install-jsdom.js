"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bundler_1 = require("./bundler");
const child_process_1 = __importDefault(require("child_process"));
(0, bundler_1.runOnBrowser)(run => {
    if (!run) {
        console.log("[*] Installing jsdom");
        const out = child_process_1.default.exec("npm install jsdom@19.0.0");
        out.stdout.pipe(process.stdout);
        out.stderr.pipe(process.stderr);
    }
});
