import { cleanUp, sendData } from '../api';
import parser from './parser';
import chalk from 'chalk';

class BundlePhobiaWebpackPlugin {
  protected name: string;

  constructor(options: { name: string }) {
    this.name = options.name;
  }

  public apply(compiler: any) {
    compiler.hooks.done.tapAsync(
      'BundlePhobiaWebpackPlugin',
      (stats: object, cb: () => void) => {
        const messageMap = {
          noReleaseName:
            'bundle-phobia-webpack-plugin: Release name must be defined.',
          storeSuccess:
            'bundle-phobia-webpack-plugin: Release data stored in the database.'
        };

        if (!this.name) {
          console.log(chalk.red(messageMap.noReleaseName));
          cb();
          return;
        }

        sendData(this.name, parser(stats))
          .then(cleanUp)
          .then(() => {
            console.log(chalk.green(messageMap.storeSuccess));
            cb();
          });
      }
    );
  }
}

export = BundlePhobiaWebpackPlugin;
