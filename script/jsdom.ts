import vm from 'vm';

export const context = vm.createContext();

export const jsdomScript = new vm.Script(`

  function jsdom(require,html){
    var dom=require("jsdom");
     return new dom.JSDOM(html).window.document.querySelector("body");
   }
`);




