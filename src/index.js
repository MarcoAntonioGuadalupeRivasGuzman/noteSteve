const {app,BrowserWindow, Menu} = require('electron')
const url = require('url')
const path = require('path')
const { electron } = require('process')

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname,{
        electron: path.join(__dirname,'../node_modules','.bin', 'electron')
    })    
}

let mainWindow
let noteWindow

app.on('ready',()=>{
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'views/index.html'),
        protocol: 'file',
        slashes: true,
    }))
    const mainMenu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(mainMenu)

    mainWindow.on('close',()=>{
        app.quit()
    })
})

function createNoteWindow(){
    noteWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'New Note'
    })
    noteWindow.setMenu(null)
    noteWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/newNote.html'),
        protocol: 'file',
        slashes: true,
    }))

    noteWindow.on('closed',()=>{
        noteWindow = null
    })
}

const templateMenu = [
    {
        label: "File",
        submenu: [
            {
                label: 'New note',
                accelerator: 'Ctrl+N',
                click(){
                    createNoteWindow()
                }
            },
            {
                label: 'Clean notes',
                click(){

                }
            },
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    },

]

if(process.platform == 'darwin'){
    templateMenu.unshift({
        label: app.getName()
    })
}

if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }   
            },
            {
                role: 'reload'
            }
        ]
    })
}