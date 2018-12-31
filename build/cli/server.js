"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const opener_1 = __importDefault(require("opener"));
const projectPath = path_1.default.resolve(__dirname, '..');
function server(stats) {
    const port = 3333;
    const host = 'localhost';
    const app = express_1.default();
    // Endpoint for stats
    app.get('/stats', (req, res) => res.send(stats));
    // Static files
    app.use(express_1.default.static(`${projectPath}/ui`));
    app.listen(port, () => {
        const url = `http://${host}:${port}`;
        console.log(`${chalk_1.default.bold('Webpack Bundle Phobia')} is started at ${chalk_1.default.bold(url)}\nUse ${chalk_1.default.bold('Ctrl+C')} to close it`);
        opener_1.default(url);
    });
}
exports.default = server;
