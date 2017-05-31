"use strict";

/**
 * This notation was generated by templates.
 * // -------------------------------------------------
 * GLOBAL FILE NOTATIONS
 * Project of: fix
 * Filename: main.js by jimmie
 * Created: 2017-02-28 @ 21:09
 * Product of: Diskovery
 * // -------------------------------------------------
 * Make sure this file is part of its proper namespace
 * and project before moving on.
 * // -------------------------------------------------
 * Code-tags conventionally should be used (See below) :
 * TODO - Something that someone need to do.
 * DOING - Self remind for what you are doing.
 * CONSIDER - Reminder to consider a change or addition.
 * BUG - The below section of a code cause a bug.
 * FIXME - The below section of code need to be fixed.
 * HACK - The below section of code is a workaround.
 * XXX - Any notation important enough to consider implementing.
 * CLARIFY - Very incomprehensible section of code below.
 *
 * Created by jimmie on (2017-02-28).
 *
 * Repository link: http://10.10.10.200/connectiontool/fix.git
 */

//require('@glimpse/glimpse').init();

/**
 * DOING: Only legacy/non-custom libraries
 * imported here.
 */
const electron = require("electron");
const {app, BrowserWindow} = electron;
const path = require("path");
const url = require("url");

//app.commandLine.appendSwitch('remote-debugging-port', '9222') // hijack chrome devtools session

let win;

app.on("ready", () => {

    /**
     * DOING: Pluck width and height of the primary display
     * to launch the window in proper size.
     * See width, minWidth, height, minHeight
     * New since version Electron 1.6.2 API
     */
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

    win = new BrowserWindow({
        title: "Diskovery",
        minWidth: width * 1,
        minHeight: height * 1,
        width: width * 0.4,
        height: height * 0.8,
        resizable: true,
        frame: true,
        transparent: false,
        vibrancy: "dark",
        skipTaskbar: true,
        movable: true,
        kiosk: false, // attempt from screensize
        //backgroundColor: "#fffttfff"
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }));

    /**
     * CONSIDER: Enable the developer tools
     * at launch by default.
     */
    //win.webContents.openDevTools();

    win.on("closed", () => {
        win = null;
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});