const {
    app,
    BrowserWindow
} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const runner = require('./runner')
let mainWindow;

if (process.resourcesPath) {
    console.log('process.resourcesPath', process.resourcesPath)
    runner(`echo start count > ${process.resourcesPath}/shell_scripts/count`)
    runner(`bash ${process.resourcesPath}/shell_scripts/test.sh`) // hello world to run scripts
} else {
    console.log('process.resourcesPath', process.resourcesPath)
    runner(`echo start count > ${process.resourcesPath}/shell_scripts/count`)
    runner(`bash shell_scripts/test.sh`) // hello world to run scripts
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    });
    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});