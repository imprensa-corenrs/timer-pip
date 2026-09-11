const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

let mainWin = null;
let overlayWin = null;

function createMainWindow() {
  mainWin = new BrowserWindow({
    width: 720,
    height: 860,
    title: 'Timer de Eventos',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWin.setMenuBarVisibility(false);
  mainWin.loadFile(path.join(__dirname, 'src', 'timer.html'));

  mainWin.on('closed', () => {
    mainWin = null;
    if (overlayWin) {
      overlayWin.close();
      overlayWin = null;
    }
  });
}

function createOverlayWindow() {
  if (overlayWin) return;

  const { width } = screen.getPrimaryDisplay().workAreaSize;

  overlayWin = new BrowserWindow({
    width: 360,
    height: 180,
    x: Math.max(0, width - 380),
    y: 40,
    minWidth: 140,
    minHeight: 70,
    frame: false,           // sem barra de título
    transparent: true,      // fundo transparente real (nativo do SO)
    backgroundColor: '#00000000',
    hasShadow: false,
    alwaysOnTop: true,      // sempre no topo de outros programas
    resizable: true,        // pode crescer/diminuir livremente
    skipTaskbar: true,      // não aparece na barra de tarefas
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // 'screen-saver' garante que fique acima até de apps em tela cheia
  overlayWin.setAlwaysOnTop(true, 'screen-saver');
  overlayWin.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  overlayWin.setMenuBarVisibility(false);
  overlayWin.loadFile(path.join(__dirname, 'src', 'overlay.html'));

  overlayWin.on('closed', () => {
    overlayWin = null;
    if (mainWin && !mainWin.isDestroyed()) {
      mainWin.webContents.send('overlay-closed');
    }
  });
}

// ── IPC: comunicação entre janela principal e overlay ─────────────
ipcMain.on('toggle-overlay', () => {
  if (overlayWin) {
    overlayWin.close();
  } else {
    createOverlayWindow();
  }
});

ipcMain.on('close-overlay', () => {
  if (overlayWin) overlayWin.close();
});

// A janela principal manda o estado atual do timer; repassamos ao overlay
ipcMain.on('timer-state', (_event, state) => {
  if (overlayWin && !overlayWin.isDestroyed()) {
    overlayWin.webContents.send('timer-state', state);
  }
});

// Overlay avisa a janela principal quando o usuário clica 2x para fechar
ipcMain.on('overlay-request-close', () => {
  if (overlayWin) overlayWin.close();
});

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
