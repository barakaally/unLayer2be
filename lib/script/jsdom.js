"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsdomScript = exports.context = void 0;
const vm_1 = __importDefault(require("vm"));
exports.context = vm_1.default.createContext();
exports.jsdomScript = new vm_1.default.Script(`

  function jsdom(require,html){
    var dom=require("jsdom");
     return new dom.JSDOM(html).window.document.querySelector("body");
   }
`);
