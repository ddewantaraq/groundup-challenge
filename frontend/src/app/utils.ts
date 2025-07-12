// Utility function to format a date as 'YYYY-MM-DD HH:mm:ss'
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    ' ' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds())
  );
}

export function setLocalStorage<T>(key: string, value: T) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getLocalStorage<T>(key: string): T | null {
  if (typeof window !== 'undefined') {
    const item = window.localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function removeLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(key);
  }
} 