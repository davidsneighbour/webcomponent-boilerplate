import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';

const execAsync = promisify(exec);

async function tagExists(tagName) {
  try {
    await execAsync(`git show-ref --tags --quiet --verify refs/tags/${tagName}`);
    return true;
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
    await execAsync('npm version patch'); // Bumps the version (patch, minor, or major)

    // Read the new version from package.json
    const pkg = JSON.parse(await fs.readFile('./package.json', 'utf8'));
    const newVersion = pkg.version;
    const tagName = `v${newVersion}`;

    console.log(`Checking if tag ${tagName} already exists...`);
    if (await tagExists(tagName)) {
      console.log(`Tag ${tagName} already exists. Skipping tag creation.`);
    } else {
      console.log(`Creating git tag for version ${newVersion}...`);
      await execAsync(`git tag ${tagName}`);
    }

    console.log('Pushing changes and tags...');
    await execAsync('git push && git push --tags');

    console.log('Publishing to NPM...');
    await execAsync('npm publish');

    console.log(`Release v${newVersion} completed successfully!`);
  } catch (err) {
    console.error('Release process failed:', err.message);
    process.exit(1);
  }
}

release();
