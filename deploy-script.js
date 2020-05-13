const { execSync } = require("child_process");
const fs = require("fs");

const findDir = (command) =>
  execSync(command).toString().trim().split("/").slice(0, -1).join("/");

const node = findDir("which node");
const npm = findDir("which npm");
const pm2 = findDir("which pm2");

const allCommands = [];

new Set([node, npm, pm2]).forEach((singleDir) => {
  allCommands.push(`export PATH=$PATH:${singleDir}`);
});

allCommands.push("npm install --production");
allCommands.push("cd client && npm install && npm run build");
allCommands.push("pm2 --version");

fs.writeFileSync("./deploy.sh", allCommands.join("\n"));
