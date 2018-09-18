const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const parseStats = require('./parser');

module.exports = class WebpackBundlePhobia {
  constructor(options) {
    this.options = Object.assign(
      {
        target: './stats.json',
        jsonOpts: {
          source: false,
          chunkModules: true
        },
        launch: false,
        capture: true,
        port: 8081,
        excludeSourceMaps: true
      },
      options
    );
  }

  apply(compiler) {
    const target = path.resolve(__dirname, this.options.target);
    const jsonOpts = this.options.jsonOpts;
    let unPureSize;
    let pureSize;
    let data;
    console.log(target);

    // CHECK IF TARGET DIRECTORY EXISTS...
    const targetDir = path.dirname(target);
    if (!fs.existsSync(targetDir)) {
      mkdirp.sync(targetDir);
    }

    // CHECK IF TARGET FILE EXISTS...
    if (fs.existsSync(target)) {
      // ...get existing data if it does
      data = JSON.parse(fs.readFileSync(target, { encoding: 'utf8' }));
    } else {
      data = {};
    }

    compiler.plugin('done', stats => {
      if (this.options.capture) {
        stats = stats.toJson(jsonOpts);
        // const prev = data[data.length - 1];
        const parsed = parseStats(stats, target, this.options);
        // Check if new data exists
        // if (
        //   !data.length ||
        //   parsed.hash !== prev.hash ||
        //   parsed.size !== prev.size ||
        //   parsed.assets.length !== prev.assets.length ||
        //   parsed.chunks.length !== prev.chunks.length
        // ) {
        console.log('Writing new build');
        // Add minified data
        // parsed.assets.forEach(asset => {
        //   isMinified.forEach(minify => {
        //     if (asset.name === minify.name) {
        //       asset.miniSize = minify.miniSize;
        //       asset.minified = minify.minified;
        //     }
        //   });
        // });
        // Add purify css data
        if (pureSize) {
          parsed.pureCssSize = pureSize;
          parsed.unPureCssSize = unPureSize;
        }

        data = parsed;
        // }
      }

      fs.writeFile(target, JSON.stringify(data, null, 2));
      console.log('000000000');
    });
  }
};
