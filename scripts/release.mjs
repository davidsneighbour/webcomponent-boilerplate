import { exec } from 'node:child_process';
import { promisify } from 'node:util';
const execAsync = promisify(exec);

async function release() {
  try {
    console.log('Building the project...');
    await execAsync('npm run build');

    console.log('Running tests...');
    await execAsync('npm test');

    console.log('Bumping version...');
    const { stdout: newVersionOutput } = await execAsync('npm version patch');
    const newVersion = newVersionOutput.trim();

    const tagName = newVersion.startsWith('v') ? newVersion : `v${newVersion}`;

    console.log('Pushing changes and tags...');
    await execAsync('git push && git push --tags');

    console.log('Publishing to NPM...');
    await execAsync('npm publish');

    console.log(`Release ${tagName} completed successfully!`);
  } catch (err) {
    console.error('Release process failed:', err.message);
    process.exit(1);
  }
}

release();
