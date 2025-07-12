'use client';
import { useState, useEffect } from 'react';
import type { Machine } from './api';
import AlertList from './AlertList';
import AlertDetail from './AlertDetail';
import { fetchMachines } from './api';

export default function AlertsContainer() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedMachine, setSelectedMachine] = useState('');
  const [selectedAlertId, setSelectedAlertId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadMachines = async () => {
      const data = await fetchMachines();
      setMachines(data);
      if (data.length > 0) {
        setSelectedMachine(data[0].id);
      }
    };
    loadMachines();
  }, []);

  useEffect(() => {
    if (machines.length > 0) {
      setSelectedMachine(machines[0].id);
      setSelectedAlertId(undefined);
    }
  }, [machines]);

  if (machines.length === 0) {
    return <div className="text-center py-8">Loading machines...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-4">
          <div className="relative w-64">
            <select
              id="machine-select"
              className="block w-full appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10 bg-white text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition text-base shadow-sm"
              value={selectedMachine}
              onChange={e => {
                setSelectedMachine(e.target.value);
                setSelectedAlertId(undefined);
              }}
            >
              {machines.map(machine => (
                <option key={machine.id} value={machine.id}>
                  {machine.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex h-[600px] gap-6">
          <div className="w-1/3 h-full overflow-y-auto border-r pr-4">
            <AlertList
              machineId={selectedMachine}
              selectedAlertId={selectedAlertId}
              onSelectAlert={setSelectedAlertId}
            />
          </div>
          <div className="w-2/3 h-full overflow-y-auto pl-4">
            <AlertDetail alertId={selectedAlertId} />
          </div>
        </div>
      </div>
    </div>
  );
} 