export interface Machine {
  id: string;
  name: string;
}

export interface Alert {
  id: string;
  timestamp: string;
  machine: { id: string; name: string };
  alert_type: string;
  created_at: string;
  suspected_reason?: string;
  action?: string;
  comment?: string;
}

export async function fetchMachines(): Promise<Machine[]> {
  const res = await fetch(`/api/machines`);
  if (!res.ok) throw new Error('Failed to fetch machines');
  const data = await res.json();
  return data.machines || [];
}