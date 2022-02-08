import { runOnBrowser } from "./bundler";
import ps from 'child_process';

runOnBrowser(run => {
    if (!run) {
        console.log("[*] Installing jsdom");
        const out = ps.exec("npm install jsdom@19.0.0");
        out.stdout.pipe(process.stdout);
        out.stderr.pipe(process.stderr);
    }
})