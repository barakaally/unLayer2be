import { runOnBrowser } from "./bundler";
import ps from 'child_process';

runOnBrowser(run => {
    if (!run) {
        const res = ps.exec("npm install jsdom@19.0.0");
        res.stdout.pipe(process.stdout);
        res.stderr.pipe(process.stderr);
    }
})