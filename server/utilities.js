const fs = require("fs");

exports.convertFileToBinary = function (file) {
    fs.writeFileSync("enrqiueBinary.txt", file);
}
