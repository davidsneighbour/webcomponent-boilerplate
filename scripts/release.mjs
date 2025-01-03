import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

async function release() {
  console.log('Building the project...');
  await execAsync('npm run build');

  console.log('Running tests...');
  await execAsync('npm test');

  console.log('Publishing to NPM...');
  await execAsync('npm publish');
}

release().catch((err) => {
  console.error('Release failed:', err);
});
