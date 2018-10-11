var gImportance = 'Not Importent'

function createIdx() {
    var length = 6
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function getLevel(key) {
    if (key == 1) return 'Not Importent'
    if (key == 2) return 'Importent'
    if (key == 3) return 'URGENT!'
}

function setImportance(key) {
    if (key == 1) gImportance = 'Not Importent'
    if (key == 2) gImportance = 'Importent'
    if (key == 3) gImportance = 'URGENT!'

}

function importance(key) {
    return gImportance
}

function checkIfEnter(ev) {
    if (ev.keyCode === 13) todoAdd()
    else return
}