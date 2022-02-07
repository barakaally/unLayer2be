"use strict";
if (typeof window === "undefined") {
    try {
        console.log("[*] Installing jsdom .....");
        const ps = require("child_process");
        let ins = ps.exec("npm install jsdom@19.0.0");
        ins.stdout.pipe(process.stdout);
    }
    catch (e) {
        console.log(e.message);
    }
}
