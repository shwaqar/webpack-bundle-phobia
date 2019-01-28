"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gzip_size_1 = __importDefault(require("gzip-size"));
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const findChunk = (chunks) => (file) => lodash_1.default.find(chunks, chunk => lodash_1.default.includes(chunk.files, file));
const assetType = (fileName) => lodash_1.default.endsWith(fileName, '.js') ? 'script' : 'css';
const isInitial = chunkInfo => (chunkInfo ? chunkInfo.canBeInitial() : true);
function parser(stats, name) {
    const findChunkByName = findChunk(stats.compilation.chunks);
    const rawFiles = lodash_1.default.pickBy(stats.compilation.assets, (v, name) => lodash_1.default.endsWith(name, '.js') || lodash_1.default.endsWith(name, '.css'));
    const assets = lodash_1.default.map(rawFiles, (asset, name) => ({
        name: path_1.default.basename(name),
        type: assetType(name),
        isInitial: isInitial(findChunkByName(name)),
        minSize: asset.size(),
        gzipSize: gzip_size_1.default.sync(asset.source())
    }));
    const totalMinSize = lodash_1.default.sumBy(assets, asset => asset.minSize);
    const totalGzipSize = lodash_1.default.sumBy(assets, asset => asset.gzipSize);
    const time = stats.endTime - stats.startTime;
    return {
        assets,
        totalMinSize,
        totalGzipSize,
        time,
        name,
        timestamp: Date.now()
    };
}
exports.default = parser;
