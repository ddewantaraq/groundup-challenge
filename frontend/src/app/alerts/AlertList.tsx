'use client';
import { useEffect, useState } from 'react';
import type { Alert } from './api';

interface AlertListProps {
  alerts: Alert[];
  loading: boolean;
  selectedAlertId?: string;
  onSelectAlert: (alertId: string) => void;
}

export default function AlertList({ alerts, loading, selectedAlertId, onSelectAlert }: AlertListProps) {
  if (loading) return <div className="text-center py-8">Loading alerts...</div>;

  return (
    <div className="space-y-2">
      {alerts.map(alert => (
        <button
          key={alert.id}
          onClick={() => onSelectAlert(alert.id)}
          className={`w-full text-left border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2 relative transition-colors duration-150
            ${selectedAlertId === alert.id ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' : 'border-blue-300 hover:bg-blue-100'}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              <span className="text-xs text-gray-500 font-medium">ID #{alert.id}</span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                alert.alert_type === 'Severe'
                  ? 'bg-red-500 text-white'
                  : alert.alert_type === 'Moderate'
                  ? 'bg-orange-400 text-white'
                  : 'bg-blue-200 text-blue-800'
              }`}
            >
              {alert.alert_type}
            </span>
          </div>
          <div>
            <div className="font-bold text-gray-800 text-sm">{alert.suspected_reason || 'no suspected reason yet'}</div>
            <div className="text-xs text-gray-500">
              Detected at {new Date(alert.timestamp).toLocaleString()}
            </div>
            <div className="text-blue-600 text-sm mt-1 underline cursor-pointer">
              {alert.machine.name}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
} 