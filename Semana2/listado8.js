let globalVar = "global";
function scope() {
    let f = 1;
    if (true) {
        let bar = "2";
    }
    console.log(globalVar);
    console.log(window.globalVar);
    console.log(f);
    console.log(bar);
}
scope();
