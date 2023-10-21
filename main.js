const {
  app,
  BrowserWindow,
  Tray,
  dialog,
  ipcMain,
  protocol,
} = require("electron");
const url = require("url");
const path = require("path");

function createMainWindow() {
  const iconPath = path.join(__dirname, "./assets/icon-fill.png");
  const appIcon = new Tray(iconPath);
  const mainWindow = new BrowserWindow({
    title: "electron",
    width: "1000",
    height: "600",
    icon: iconPath,
    webPreferences: {
      enableRemoteModule: true,
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.maximize();
  mainWindow.webContents.openDevTools();

  const startUrl = url.format({
    pathname: path.join(__dirname, "./user-interface/dist/index.html"),
  });

  // mainWindow.loadFile(startUrl); //production
  mainWindow.loadURL("http://localhost:5173"); //dev

  ipcMain.handle("dialog:openDirectory", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    });
    if (canceled) {
      return "";
    } else {
      return filePaths[0];
    }
  });
  protocol.registerFileProtocol("media-loader", (request, callback) => {
    const url = request.url.replace("media-loader://", "");
    try {
      return callback(url);
    } catch (err) {
      console.error(error);
      return callback(404);
    }
  });
}

app.whenReady().then(createMainWindow);
