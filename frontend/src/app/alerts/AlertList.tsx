'use client';
import { useMemo } from 'react';
import type { Alert } from './api';
import { formatDate } from '../utils';

interface AlertListProps {
  alerts: Alert[];
  loading: boolean;
  selectedAlertId?: string;
  onSelectAlert: (alertId: string) => void;
}

const NEW_ALERT_MINUTES = typeof process.env.NEXT_PUBLIC_NEW_ALERT_MINUTES === 'string'
  ? parseInt(process.env.NEXT_PUBLIC_NEW_ALERT_MINUTES)
  : 5;

function isNewAlert(alert: Alert): boolean {
  if (!alert.timestamp) return false;
  const alertTime = new Date(alert.timestamp).getTime();
  const now = Date.now();
  return now - alertTime < NEW_ALERT_MINUTES * 60 * 1000;
}

export default function AlertList({ alerts, loading, selectedAlertId, onSelectAlert }: AlertListProps) {
  const totalAlerts = alerts.length;
  const newAlerts = useMemo(() => alerts.filter(isNewAlert), [alerts]);
  const newCount = newAlerts.length;

  const alertTypeClassMap: Record<string, string> = {
    Severe: 'bg-red-500 text-white',
    Moderate: 'bg-amber-400 text-white',
    Mild: 'bg-green-500 text-white',
  };

  if (loading) return <div className="text-center py-8">Loading alerts...</div>;

  return (
    <div className="space-y-2 overflow-y-auto max-h-full">
      {/* Back Button */}
      <div className="flex items-center justify-start px-2 border-b-2 border-gray-200">
        <button
          type="button"
          className="flex items-center gap-2 py-2 bg-white rounded-t-md text-[15px] font-medium focus:outline-none"
          onClick={() => {}}
          aria-label="Back"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 14.25L6.75 9.75L11.25 5.25" stroke="#002366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[#002366]">Back</span>
        </button>
      </div>
      {/* Header */}
      <div className="flex items-center justify-start gap-4 px-2 pt-2 pb-2 border-b-2 border-gray-200 mb-6">
        <span className="text-gray-600 font-medium text-[14px]">{totalAlerts} Alerts</span>
        <span className="inline-flex items-center px-4 py-1 rounded-full bg-blue-600 text-white font-semibold text-[14px]">{newCount} New</span>
      </div>
      {/* Alerts */}
      {alerts.map(alert => {
        const isNew = isNewAlert(alert);
        const isSelected = selectedAlertId === alert.id;
        // Use the hashmap for alert type class
        const alertTypeClass = alertTypeClassMap[alert.alert_type] || 'bg-gray-300 text-gray-700';
        return (
          <div key={alert.id} className="mr-4">
            <button
              onClick={() => onSelectAlert(alert.id)}
              className={`w-full text-left border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2 relative transition-colors duration-150 mb-2 cursor-pointer
                ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300 hover:bg-blue-50'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {isNew && <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />}
                  <span className="text-xs text-gray-500 font-medium">ID #{alert.id}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${alertTypeClass}`}>{alert.alert_type}</span>
              </div>
              <div>
                <div className="font-bold text-gray-800 text-base mb-1">{alert.suspected_reason || 'no suspected reason yet'}</div>
                <div className="text-xs text-gray-500 mb-1">
                  Detected at {formatDate(alert.timestamp)}
                </div>
                <div className="text-blue-600 text-sm mt-1 underline cursor-pointer">
                  {alert.machine.name}
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
} 