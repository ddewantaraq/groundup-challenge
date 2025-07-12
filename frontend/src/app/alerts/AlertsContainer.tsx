'use client';
import { useState, useEffect } from 'react';
import type { Machine } from './api';
import AlertList from './AlertList';
import AlertDetail from './AlertDetail';
import { fetchMachines } from './api';
import type { Alert } from './api';
import { setLocalStorage, getLocalStorage } from '../utils';

const SELECTED_MACHINE_KEY = 'selectedMachineId';
const SELECTED_ALERT_KEY = 'selectedAlertId';

export default function AlertsContainer() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedMachine, setSelectedMachine] = useState('');
  const [selectedAlertId, setSelectedAlertId] = useState<string | undefined>(undefined);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loadingAlerts, setLoadingAlerts] = useState(false);
  const [audioAssets, setAudioAssets] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadMachines = async () => {
      const data = await fetchMachines();
      setMachines(data);
      if (data.length > 0) {
        const storedId = getLocalStorage<string>(SELECTED_MACHINE_KEY);
        const found = storedId && data.find(m => m.id === storedId);
        setSelectedMachine(found ? found.id : data[0].id);
      }
    };
    loadMachines();
    // Fetch S3 audio assets on mount
    const fetchAudioAssets = async () => {
      try {
        const res = await fetch('/api/s3-audios');
        if (res.ok) {
          const data = await res.json();
          // Convert array of { key, url } to map
          const map: { [key: string]: string } = {};
          for (const item of data) {
            map[item.key] = item.url;
          }
          setAudioAssets(map);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch S3 audio assets', err);
      }
    };
    fetchAudioAssets();

    if (typeof window !== 'undefined') {
      const storedAlertId = getLocalStorage<string>(SELECTED_ALERT_KEY);
      if (storedAlertId) {
        setSelectedAlertId(storedAlertId);
        window.location.hash = `#${storedAlertId}`;
      } else {
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
          setSelectedAlertId(hash.substring(1));
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!selectedMachine) return;
    const fetchAlerts = async () => {
      setLoadingAlerts(true);
      const res = await fetch(`/api/alerts?machineId=${encodeURIComponent(selectedMachine)}`);
      if (res.ok) {
        const data = await res.json();
        setAlerts(data);
      } else {
        setAlerts([]);
      }
      setLoadingAlerts(false);
    };
    fetchAlerts();
    setLocalStorage(SELECTED_MACHINE_KEY, selectedMachine);
  }, [selectedMachine]);

  const handleAlertUpdated = (updatedAlert: Alert) => {
    setAlerts(prevAlerts => prevAlerts.map(alert => alert.id === updatedAlert.id ? updatedAlert : alert));
  };

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
                setLocalStorage(SELECTED_ALERT_KEY, '');
                if (typeof window !== 'undefined') {
                  window.location.hash = '';
                }
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
        <div className="flex h-[600px] gap-6 border-t-2 border-gray-200">
          <div className="w-1/3 h-full overflow-y-auto border-r border-gray-200">
            <AlertList
              alerts={alerts}
              loading={loadingAlerts}
              selectedAlertId={selectedAlertId}
              onSelectAlert={alertId => {
                setSelectedAlertId(alertId);
                setLocalStorage(SELECTED_ALERT_KEY, alertId);
                if (typeof window !== 'undefined') {
                  window.location.hash = `#${alertId}`;
                }
              }}
            />
          </div>
          <div className="w-2/3 h-full overflow-y-auto pl-4 mt-4">
            <AlertDetail alertId={selectedAlertId} onAlertUpdated={handleAlertUpdated} audioAssets={audioAssets} />
          </div>
        </div>
      </div>
    </div>
  );
} 