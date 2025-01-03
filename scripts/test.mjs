import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

async function runTests() {
  console.log('Running tests...');
  await execAsync('vitest run');
}

runTests().catch((err) => {
  console.error('Tests failed:', err);
});
