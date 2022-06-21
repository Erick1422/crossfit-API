// Este archivo sobreescribe la información del JSON
const fs = require('fs');

const saveToDatabase = (DB) => {
    fs.writeFileSync("./src/database/db.json", JSON.stringify(DB, null, 4), {
        encoding: "utf-8"
    });
}

module.exports = {
    saveToDatabase
}