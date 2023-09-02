const fs = require("node:fs");
const path = require("node:path");

const pathToBuildDir = path.join(__dirname, "build");
const pathToBuildJsonFile = path.join(pathToBuildDir, "data.json");
const pathToSrcJsonFile = path.join(__dirname, "src", "data.json");

fs.copyFileSync(pathToBuildJsonFile, pathToSrcJsonFile);

fs.rmSync(pathToBuildDir, {recursive: true, force: true});
