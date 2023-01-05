const {
	app,
	BrowserWindow,
	ipcMain,
	nativeTheme,
	BrowserView,
} = require("electron");
const path = require("path");

function createWindow() {
	const win = new BrowserWindow({
		width: 1366,
		height: 768,
		minWidth: 800,
		minHeight: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
		},
	});

	win.loadFile("index.html");
	// 切换主题
	ipcMain.handle("dark-mode:toggle", () => {
		if (nativeTheme.shouldUseDarkColors) {
			nativeTheme.themeSource = "light";
		} else {
			nativeTheme.themeSource = "dark";
		}
		return nativeTheme.shouldUseDarkColors;
	});
	ipcMain.handle("dark-mode:system", () => {
		nativeTheme.themeSource = "system";
	});
}

app.whenReady().then(() => {
	createWindow();
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("before-quit", () => {
	clearInterval(progressInterval);
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
