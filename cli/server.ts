import express from 'express';
import path from 'path';
import chalk from 'chalk';
import opener from 'opener';

const projectPath = path.resolve(__dirname, '..');

export default function server(stats) {
  const port = 3333;
  const host = 'localhost';
  const app = express();

  // Endpoint for stats
  app.get('/stats', (req, res) => res.send(stats));

  // Static files
  app.use(express.static(`${projectPath}/ui`));

  app.listen(port, () => {
    const url = `http://${host}:${port}`;

    console.log(
      `${chalk.bold('Webpack Bundle Phobia')} is started at ${chalk.bold(
        url
      )}\nUse ${chalk.bold('Ctrl+C')} to close it`
    );

    opener(url);
  });
}
