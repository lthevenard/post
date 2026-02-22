import crypto from 'node:crypto';

const input = process.argv.slice(2).join(' ');
if (!input) {
  console.error('Usage: node tools/sha256.mjs "your password"');
  process.exit(1);
}

process.stdout.write(crypto.createHash('sha256').update(input, 'utf8').digest('hex') + '\n');

