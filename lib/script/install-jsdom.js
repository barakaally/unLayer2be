"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bundler_1 = require("./bundler");
const child_process_1 = __importDefault(require("child_process"));
(0, bundler_1.runOnBrowser)(run => {
    if (!run) {
        process.stdout.write("[*] Installing");
        let interval = setInterval(() => {
            process.stdout.write(".");
        }, 1000);
        child_process_1.default.exec("npm install jsdom@19.0.0", (err, stdout, stderr) => {
            clearInterval(interval);
            process.stdout.write("\r");
            process.stdout.write(stdout);
            process.stderr.write(stderr);
        });
    }
});
