import * as admin from 'firebase-admin';
import pkgDir from 'pkg-dir';
import path from 'path';
import fs from 'fs';

delete require.cache[__filename];
const parentDir = path.dirname(
  (module.parent && module.parent.filename) || '.'
);
const rootDir = pkgDir.sync(parentDir) || '.';
const keyFilePath = path.resolve(rootDir, 'key.json');

if (!fs.existsSync(keyFilePath)) {
  throw new Error('Key file with name "key.json" is required!');
}

const key = fs.readFileSync(keyFilePath, 'utf8');

export default admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(key)),
  databaseURL: 'https://webpack-bundle-phobia-cdcb6.firebaseio.com'
});
