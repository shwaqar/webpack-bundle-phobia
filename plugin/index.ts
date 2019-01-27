import Api from '../api';
import parser from './parser';
import chalk from 'chalk';

class BundlePhobiaWebpackPlugin {
  protected name: string;
  protected api: any;

  constructor(options: { name: string }) {
    this.name = options.name;

    try {
      this.api = new Api();
    } catch {
      this.api = null;
    }
  }

  public apply(compiler: any) {
    compiler.hooks.done.tapAsync(
      'BundlePhobiaWebpackPlugin',
      (stats: object, cb: () => void) => {
        const messageMap = {
          noReleaseName:
            'bundle-phobia-webpack-plugin: Release name must be defined.',
          storeSuccess:
            'bundle-phobia-webpack-plugin: Release data stored in the database.',
          apiFailed:
            'bundle-phobia-webpack-plugin: Firebase initialization failed!'
        };

        if (!this.name) {
          console.log(chalk.red(messageMap.noReleaseName));
          cb();
          return;
        }

        if (!this.api) {
          console.log(chalk.red(messageMap.apiFailed));
          cb();
          return;
        }

        this.api
          .sendData(this.name, parser(stats, this.name))
          .then(() => this.api.cleanUp())
          .then(() => {
            console.log(chalk.green(messageMap.storeSuccess));
            cb();
          });
      }
    );
  }
}

export = BundlePhobiaWebpackPlugin;
