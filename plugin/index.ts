import { auth, cleanUp, sendData } from '../api';
import parser from './parser';
import chalk from 'chalk';

class BundlePhobiaWebpackPlugin {
  protected name: string;
  protected credentials: { email: string; password: string };

  constructor(options: {
    name: string;
    credentials: { email: string; password: string };
  }) {
    this.name = options.name;
    this.credentials = options.credentials;
  }

  public apply(compiler: any) {
    compiler.hooks.done.tapAsync(
      'BundlePhobiaWebpackPlugin',
      (stats: object, cb: () => void) => {
        const messageMap = {
          noCredentials:
            'bundle-phobia-webpack-plugin: Credentials name must be defined.',
          noReleaseName:
            'bundle-phobia-webpack-plugin: Release name must be defined.',
          storeSuccess:
            'bundle-phobia-webpack-plugin: Release data stored in the database.'
        };
        const errorMsg = !this.name
          ? messageMap.noReleaseName
          : messageMap.noCredentials;

        if (!this.name || !this.credentials) {
          console.log(chalk.red(errorMsg));
          cb();
          return;
        }

        auth(this.credentials)
          .then(() => sendData(this.name, parser(stats)))
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
