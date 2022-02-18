import { spawnSync } from 'child_process';

/**
 * Returns output created by the script without displaying it.
 */
const query = (script: string) => spawnSync(script, { stdio: 'pipe', shell: true, encoding: 'utf8' });

/**
 * Displays output created by the script but doesn't return it.
 */
const command = (script: string) => spawnSync(script, { stdio: 'inherit', shell: true, encoding: 'utf8' });

export const exec = { query, command };
