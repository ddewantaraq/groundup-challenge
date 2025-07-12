'use client';
import { useEffect, useState } from 'react';
import AlertDetailClient from './AlertDetailClient';
import type { Alert } from './api';

export default function AlertDetail({ alertId }: { alertId?: string }) {
  const [alert, setAlert] = useState<Alert | undefined>(undefined);

  useEffect(() => {
    if (!alertId) {
      setAlert(undefined);
      return;
    }
    fetch(`/api/alerts/${alertId}`)
      .then(res => res.ok ? res.json() : undefined)
      .then(data => setAlert(data))
      .catch(() => setAlert(undefined));
  }, [alertId]);

  return <AlertDetailClient alert={alert} />;
} 