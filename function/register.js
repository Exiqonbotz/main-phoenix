const fs = require('fs-extra');
const path = require('path');

// Definieren Sie den Pfad zur JSON-Datei
const dataDir = path.join(__dirname, '../database/bot');
const dataFile = path.join(dataDir, 'registered.json');

// Sicherstellen, dass das Verzeichnis und die Datei existieren
fs.ensureFileSync(dataFile);

// Initialisieren Sie die Datei, wenn sie leer ist
if (fs.readFileSync(dataFile, 'utf-8').trim() === '') {
    fs.writeFileSync(dataFile, '[]');
}

// Funktion zum Laden und Parsen der Registrierungsdaten
function loadRegisteredData() {
    delete require.cache[require.resolve(dataFile)];
    return JSON.parse(fs.readFileSync(dataFile));
}

// Initiales Laden der registrierten Daten
let _registered = loadRegisteredData();

// Überwache die Datei auf Änderungen
fs.watchFile(dataFile, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
        console.log('Datei geändert, aktualisiere Registrierungen...');
        _registered = loadRegisteredData();
    }
});

/**
 * Add user to database.
 * @param {string} userId
 * @param {string} name
 * @param {string} time
 * @param {string} serial
 */
const addRegisteredUser = (userId, name, time, serial) => {
    const obj = { id: userId, name: name, time: time, serial: serial };
    _registered.push(obj);
    fs.writeFileSync(dataFile, JSON.stringify(_registered, null, 2));
}

/**
 * Check is user registered.
 * @param {string} userId
 * @returns {boolean}
 */
const checkRegisteredUser = (userId) => {
    return _registered.some(user => user.id === userId);
}

/**
 * Check is user registered from given serial.
 * @param {string} serial
 * @returns {boolean}
 */
const checkRegisteredUserFromSerial = (serial) => {
    return _registered.some(user => user.serial === serial);
}

/**
 * Get registered user ID.
 * @param {string} userId
 * @returns {string|null}
 */
const getRegisteredUserId = (userId) => {
    const user = _registered.find(user => user.id === userId);
    return user ? user.id : null;
}

/**
 * Check user name from serial.
 * @param {string} serial
 * @returns {string|null}
 */
const getRegisteredNameFromSerial = (serial) => {
    const user = _registered.find(user => user.serial === serial);
    return user ? user.name : null;
}

/**
 * Check user time registration from serial.
 * @param {string} serial
 * @returns {string|null}
 */
const getRegisteredTimeFromSerial = (serial) => {
    const user = _registered.find(user => user.serial === serial);
    return user ? user.time : null;
}

/**
 * Check user ID from serial.
 * @param {string} serial
 * @returns {string|null}
 */
const getRegisteredIdFromSerial = (serial) => {
    const user = _registered.find(user => user.serial === serial);
    return user ? user.id : null;
}

/**
 * Get random user ID.
 * @returns {string}
 */
const getRegisteredRandomId = () => {
    return _registered[Math.floor(Math.random() * _registered.length)].id;
}

/**
 * Check if user is not registered.
 * @param {string} userId
 * @returns {boolean}
 */
const isUserNotRegistered = (userId) => {
    return !checkRegisteredUser(userId);
}

/**
 * Get position of registered user.
 * @param {string} userId
 * @returns {number|null}
 */
const getRegisteredPosition = (userId) => {
    return _registered.findIndex(user => user.id === userId);
}

module.exports = {
    addRegisteredUser,
    checkRegisteredUser,
    isUserNotRegistered,
    checkRegisteredUserFromSerial,
    getRegisteredNameFromSerial,
    getRegisteredTimeFromSerial,
    getRegisteredIdFromSerial,
    getRegisteredRandomId,
    getRegisteredUserId,
    getRegisteredPosition
};
