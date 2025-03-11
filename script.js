const fs = require("fs");
const path = require("path");

const OUTPUT_FILE = path.join(__dirname, "random_objects.txt");
const OUTPUT_PROCESSED_FILE = path.join(__dirname, "processed_output.txt");
const MB10 = 10 * 1024 * 1024;
const MAX_GAP = 10;

function randomAlphaStr(len = 10) {
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < len; i++) {
        result += letters[Math.floor(Math.random() * letters.length)];
    }
    return result;
}

function randomRealNum() {
    return (Math.random() * 1000).toFixed(5);
}

function randomInt() {
    return Math.floor(Math.random() * 10000);
}

function randomAlnum() {
    let base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let out = "";
    for (let i = 0; i < 10; i++) {
        out += base[Math.floor(Math.random() * base.length)];
    }
    let before = " ".repeat(Math.floor(Math.random() * MAX_GAP));
    let after = " ".repeat(Math.floor(Math.random() * MAX_GAP));
    return before + out + after;
}

function createBulkRandomContent() {
    let finalString = "";
    while (Buffer.byteLength(finalString, "utf8") < MB10 - 100) {
        finalString += randomAlphaStr() + "," + randomRealNum() + "," + randomInt() + "," + randomAlnum() + ",";
    }
    while (Buffer.byteLength(finalString, "utf8") > MB10) {
        finalString = finalString.slice(0, -1);
    }
    return finalString;
}

fs.writeFileSync(OUTPUT_FILE, createBulkRandomContent(), "utf8");

function classifyData() {
    const rawData = fs.readFileSync(OUTPUT_FILE, "utf8");
    let items = rawData.split(",").filter(x => x.trim());
    let outputLines = [];

    items.forEach(entry => {
        let trimmed = entry.trim();
        let valType = "Alphanumeric";
        if (/^[a-zA-Z]+$/.test(trimmed)) {
            valType = "Alphabetical String";
        } else if (/^\d+\.\d+$/.test(trimmed)) {
            valType = "Real Number";
        } else if (/^\d+$/.test(trimmed)) {
            valType = "Integer";
        }
        outputLines.push(`Value: "${trimmed}", Type: ${valType}`);
    });

    fs.writeFileSync(OUTPUT_PROCESSED_FILE, outputLines.join("\n"), "utf8");
    outputLines.forEach(line => console.log(line));
}

classifyData();
