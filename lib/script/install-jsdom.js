"use strict";
if (typeof window === "undefined") {
    try {
        console.log("[*] Installing jsdom .......");
        const ps = require("child_process");
        ps.execSync("npm install jsdom");
        console.log("[✓] successfully jsdom installed!");
    }
    catch (e) {
        console.log(e.message);
    }
}
