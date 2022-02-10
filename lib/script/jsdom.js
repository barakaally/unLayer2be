"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsdom = void 0;
function jsdom() {
    try {
        var vm = require('vm');
        const context = vm.createContext();
        const jscript = new vm.Script(`

  function jsdom(require,html){
    var dom=require("jsdom");
     return new dom.JSDOM(html).window.document.querySelector("body");
   }
   
  `);
        return { context, jscript };
    }
    catch (error) { }
}
exports.jsdom = jsdom;
