import { runOnBrowser } from "./bundler";
import ps from 'child_process';

runOnBrowser(run => {
    if (!run) {
     
        process.stdout.write("[*] Installing");
        let interval = setInterval(() => {
            process.stdout.write(".");
        }, 1000);

        ps.exec("npm install jsdom@19.0.0", (err, stdout, stderr) => {
            clearInterval(interval);
            process.stdout.write("\r");
            process.stdout.write(stdout);
            process.stderr.write(stderr);
        });


    }
})