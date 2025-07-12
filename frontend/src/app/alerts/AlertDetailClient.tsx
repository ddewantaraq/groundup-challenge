'use client';
import type { Alert } from './api';

export default function AlertDetailClient({ alert }: { alert?: Alert }) {
  if (!alert) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-lg">
        Please choose the alert to see the detail
      </div>
    );
  }
  return (
    <div className="p-6">
      <div className="text-xl font-bold mb-2">Alert ID #{alert.id}</div>
      <div className="text-gray-500 mb-4">Detected at {new Date(alert.timestamp).toLocaleString()}</div>
      {/* Placeholder for audio and spectrograms */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 border p-2 rounded">
          <div className="font-semibold mb-1">Anomaly Machine Output</div>
          <div className="bg-gray-200 h-24 mb-2 flex items-center justify-center">[Audio Player]</div>
          <div className="bg-gray-100 h-24 flex items-center justify-center">[Spectrogram]</div>
        </div>
        <div className="flex-1 border p-2 rounded">
          <div className="font-semibold mb-1">Normal Machine Output</div>
          <div className="bg-gray-200 h-24 mb-2 flex items-center justify-center">[Audio Player]</div>
          <div className="bg-gray-100 h-24 flex items-center justify-center">[Spectrogram]</div>
        </div>
      </div>
      <div className="mb-2"><span className="font-semibold">Equipment:</span> {alert.machine.name}</div>
      <div className="mb-2"><span className="font-semibold">Suspected Reason:</span> {alert.suspected_reason || '-'}</div>
      <div className="mb-2"><span className="font-semibold">Action Required:</span> {alert.action || '-'}</div>
      <div className="mb-2"><span className="font-semibold">Comments:</span> {alert.comment || '-'}</div>
    </div>
  );
} 