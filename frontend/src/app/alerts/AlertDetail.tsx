'use client';
import { useEffect, useState } from 'react';
import AlertDetailClient from './AlertDetailClient';
import type { Alert } from './api';

interface AlertDetailProps {
  alertId?: string;
  onAlertUpdated?: (alert: Alert) => void;
  audioAssets?: { [key: string]: string };
}

export default function AlertDetail({ alertId, onAlertUpdated, audioAssets }: AlertDetailProps) {
  const [alert, setAlert] = useState<Alert | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!alertId) {
      setAlert(undefined);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/alerts/${alertId}`)
      .then(res => res.ok ? res.json() : undefined)
      .then(data => setAlert(data))
      .catch(() => setAlert(undefined))
      .finally(() => setLoading(false));
  }, [alertId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-lg">
        Loading alert detail...
      </div>
    );
  }

  return <AlertDetailClient alert={alert} onAlertUpdated={onAlertUpdated} audioAssets={audioAssets} />;
} 