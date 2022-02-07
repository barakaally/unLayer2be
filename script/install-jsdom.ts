if (typeof window === "undefined") {
    try {

        let o = "[*]Installing jsdom ..";
        setInterval(() => {
            o += ".";
            console.log(o);
        }, 1000);

        const ps = require("child_process");
        ps.execSync("npm install jsdom@19.0.0");
        console.log("[+] jsdom@19.0.0");
    }
    catch (e: any) {
        console.log(e.message);
    }
}