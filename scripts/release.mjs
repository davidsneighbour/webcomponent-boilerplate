import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';

const execAsync = promisify(exec);

async function tagExists(tagName) {
  try {
    const { stdout } = await execAsync('git tag');
    const tags = stdout.split('\n').map((tag) => tag.trim());
    return tags.includes(tagName);
  } catch {
    return false;
  }
}

async function release() {
  try {
    console.log('Building the project...');
    await execAsync('npm run build');

    console.log('Running tests...');
    await execAsync('npm test');

    console.log('Bumping version...');
    const { stdout: newVersionOutput } = await execAsync('npm version patch'); // Bumps the version
    const newVersion = newVersionOutput.trim(); // Extracts the new version tag (e.g., "v1.0.2")

    const tagName = newVersion.startsWith('v') ? newVersion : `v${newVersion}`;

    console.log(`Checking if tag ${tagName} exists...`);
    if (!(await tagExists(tagName))) {
      console.log(`Creating git tag for version ${tagName}...`);
      await execAsync(`git tag ${tagName}`);
    } else {
      console.log(`Tag ${tagName} already exists. Skipping tag creation.`);
    }

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
