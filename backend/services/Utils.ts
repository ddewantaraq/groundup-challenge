const MACHINE_PREFIX = 'MCH';
const ALERT_PREFIX = 'ALT';
const MAX = 1000000;

function getSecretShift(): number {
  const shift = parseInt(process.env.SECRET_SHIFT || '', 10);
  if (isNaN(shift)) {
    throw new Error('SECRET_SHIFT environment variable must be a valid number');
  }
  return shift;
}

export function encodeId(id: number, type: 'machine' | 'alert'): string {
  try {
    const SECRET_SHIFT = getSecretShift();
    const encoded = (id + SECRET_SHIFT) % MAX;
    const padded = encoded.toString().padStart(6, '0');
    return (type === 'machine' ? MACHINE_PREFIX : ALERT_PREFIX) + padded;
  } catch (err) {
    throw new Error(`Failed to encode ID: ${(err as Error).message}`);
  }
}

export function decodeId(obfuscated: string, type: 'machine' | 'alert'): number {
  try {
    const SECRET_SHIFT = getSecretShift();
    let prefix = type === 'machine' ? MACHINE_PREFIX : ALERT_PREFIX;
    if (!obfuscated.startsWith(prefix)) throw new Error('Invalid ID prefix');
    const num = parseInt(obfuscated.slice(prefix.length), 10);
    return (num - SECRET_SHIFT + MAX) % MAX;
  } catch (err) {
    throw new Error(`Failed to decode ID: ${(err as Error).message}`);
  }
} 