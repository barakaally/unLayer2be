import ps from 'child_process';
const bundlers = ["webpack", "browserify", "rollup", "esbuild", "parcel", "babel"];

export function runOnBrowser(callback: (run: boolean) => void) {
    const res = ps.exec(`npm list ${bundlers.join(",").replace(/\,/g, " ")}`);
    let result = "";
    res.stdout.on("data", (data) => {
        result += data;
    });

    res.stdout.on("end", () => {
        callback(new RegExp(`(${bundlers.join("|")})`, "gi").test(`${result.replace(/\`/g,"")}` ));
    })
}
