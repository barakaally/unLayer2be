"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runOnBrowser = void 0;
const child_process_1 = __importDefault(require("child_process"));
const bundlers = ["webpack", "browserify", "rollup", "esbuild", "parcel", "babel"];
function runOnBrowser(callback) {
    const res = child_process_1.default.exec(`npm list ${bundlers.join(",").replace(/\,/g, " ")}`);
    let result = "";
    res.stdout.on("data", (data) => {
        result += data;
    });
    res.stdout.on("end", () => {
        callback(new RegExp(`(${bundlers.join("|")})`, "gi").test(`${result.replace(/\`/g, "")}`));
    });
}
exports.runOnBrowser = runOnBrowser;
