'use client';
import { useEffect, useState, useMemo } from 'react';
import type { Alert } from './api';

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

  if (loading) return <div className="text-center py-8">Loading alerts...</div>;

  return (
    <div className="space-y-2 overflow-y-auto max-h-full">
      {/* Header */}
      <div className="flex items-center justify-start gap-4 px-2 pt-2 pb-2 border-b border-gray-200 mb-2">
        <span className="text-gray-600 text-base font-medium">{totalAlerts} Alerts</span>
        <span className="inline-flex items-center px-4 py-1 rounded-full bg-blue-600 text-white font-semibold text-sm">{newCount} New</span>
      </div>
      {/* Alerts */}
      {alerts.map(alert => {
        const isNew = isNewAlert(alert);
        const isSelected = selectedAlertId === alert.id;
        return (
          <button
            key={alert.id}
            onClick={() => onSelectAlert(alert.id)}
            className={`w-full text-left border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2 relative transition-colors duration-150 mb-2
              ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300 hover:bg-blue-50'}`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                {isNew && <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />}
                <span className="text-xs text-gray-500 font-medium">ID #{alert.id}</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-400 text-white">{alert.alert_type}</span>
            </div>
            <div>
              <div className="font-bold text-gray-800 text-base mb-1">{alert.suspected_reason || 'no suspected reason yet'}</div>
              <div className="text-xs text-gray-500 mb-1">
                Detected at {new Date(alert.timestamp).toLocaleString()}
              </div>
              <div className="text-blue-600 text-sm mt-1 underline cursor-pointer">
                {alert.machine.name}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
} 