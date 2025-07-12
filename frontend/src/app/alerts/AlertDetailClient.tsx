'use client';
import { useEffect, useRef, useState } from 'react';
import type { Alert } from './api';
import WaveSurfer from 'wavesurfer.js';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugins/spectrogram.esm.js';
import { ACTIONS, SUSPECTED_REASONS } from '../const';
import { formatDate } from '../utils';

type AlertUpdate = Pick<Alert, 'suspected_reason' | 'action' | 'comment'>;

interface AlertDetailClientProps {
  alert?: Alert;
  onAlertUpdated?: (alert: Alert) => void;
  audioAssets?: { [key: string]: string };
}

export default function AlertDetailClient({ alert, onAlertUpdated, audioAssets }: AlertDetailClientProps) {
  const [suspectedReason, setSuspectedReason] = useState(() => alert?.suspected_reason || '');
  const [action, setAction] = useState(() => alert?.action || '');
  const [comment, setComment] = useState(() => alert?.comment || '');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [updating, setUpdating] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(alert);
  const [waveformLoading, setWaveformLoading] = useState(true);

  useEffect(() => {
    setSuspectedReason(alert?.suspected_reason || '');
    setAction(alert?.action || '');
    setComment(alert?.comment || '');
    setCurrentAlert(alert);
  }, [alert]);

  // Use S3 audio asset if available
  const audioUrl = (audioAssets && currentAlert?.sound_clip && audioAssets[currentAlert.sound_clip])
    ? audioAssets[currentAlert.sound_clip]
    : '';

  const anomalyWaveformRef = useRef<HTMLDivElement>(null);
  const anomalySpectrogramRef = useRef<HTMLDivElement>(null);
  const normalWaveformRef = useRef<HTMLDivElement>(null);
  const normalSpectrogramRef = useRef<HTMLDivElement>(null);

  function createWaveSurfer(waveformRef: React.RefObject<HTMLDivElement | null>, spectrogramRef: React.RefObject<HTMLDivElement | null>, url: string) {
    try {
      if (url && waveformRef.current && spectrogramRef.current) {
        const ws = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: '#2563eb',
          progressColor: '#1d4ed8',
          height: 80,
          barWidth: 2,
          url,
          plugins: [
            SpectrogramPlugin.create({
              container: spectrogramRef.current,
              labels: true,
              height: 120,
              fftSamples: 512,
              frequencyMax: 8000,
            }),
          ],
        });
        return ws;
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('WaveSurfer error:', err);
    }
    return null;
  }

  useEffect(() => {
    let wsAnomaly: WaveSurfer | null = null;
    let wsNormal: WaveSurfer | null = null;
    let readyCount = 0;
    setWaveformLoading(true);
    function handleReady() {
      readyCount += 1;
      if (readyCount === 2) setWaveformLoading(false);
    }
    try {
      wsAnomaly = createWaveSurfer(anomalyWaveformRef, anomalySpectrogramRef, audioUrl);
      wsNormal = createWaveSurfer(normalWaveformRef, normalSpectrogramRef, audioUrl);
      if (wsAnomaly) wsAnomaly.on('ready', handleReady);
      if (wsNormal) wsNormal.on('ready', handleReady);
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to load audio visualization.' });
      setWaveformLoading(false);
    }
    return () => {
      if (wsAnomaly) wsAnomaly.destroy();
      if (wsNormal) wsNormal.destroy();
    };
  }, [audioUrl]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  async function handleUpdate() {
    if (!currentAlert) return;
    setUpdating(true);
    setNotification(null);
    try {
      const payload: AlertUpdate = {
        suspected_reason: suspectedReason,
        action,
        comment,
      };
      const res = await fetch(`/api/alerts/${currentAlert.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update alert');
      const updated = await res.json();
      setCurrentAlert(updated);
      setNotification({ type: 'success', message: 'Update successful!' });
      if (onAlertUpdated) onAlertUpdated(updated);
    } catch (e) {
      setNotification({ type: 'error', message: 'Failed to update alert.' });
    } finally {
      setUpdating(false);
    }
  }

  if (!currentAlert) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-lg">
        Please choose the alert to see the detail
      </div>
    );
  }

  return (
    <div className="relative">
      {notification && (
        <div className={`fixed right-8 bottom-8 z-50 px-8 py-5 rounded-xl shadow-2xl text-white text-lg font-semibold transition-all
          min-w-[320px] max-w-[90vw] w-auto
          ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        >
          {notification.message}
        </div>
      )}
      <div className="text-[25px] text-[#5F6368] mb-3 mt-4">Alert ID #{currentAlert.id}</div>
      <div className="text-gray-500 mb-3">Detected at {formatDate(currentAlert.timestamp)}</div>
      <div className="flex gap-4 mb-6">
        <div className="flex-1 p-2 relative">
          <div className="text-[#5F6368] text-[19px] font-semibold mb-3">Anomaly Machine Output</div>
          <audio controls src={audioUrl} className="w-full h-8 mx-auto mb-2 block" />
          <div ref={anomalyWaveformRef} className="w-full h-20 mb-2" />
          <div ref={anomalySpectrogramRef} className="w-full h-32" />
          {waveformLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
              <div className="text-blue-600 font-semibold text-sm">Loading audio visualization...</div>
            </div>
          )}
        </div>
        <div className="flex-1 p-2 relative">
          <div className="text-[#5F6368] text-[19px] font-semibold mb-3">Normal Machine Output</div>
          <audio controls src={audioUrl} className="w-full h-8 mx-auto mb-2 block" />
          <div ref={normalWaveformRef} className="w-full h-20 mb-2" />
          <div ref={normalSpectrogramRef} className="w-full h-32" />
          {waveformLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
              <div className="text-blue-600 font-semibold text-sm">Loading audio visualization...</div>
            </div>
          )}
        </div>
      </div>
      <div className="mb-4">
        <div className="font-semibold text-[15px] mb-2">Equipment:</div>
        <div className="text-[15px] mt-1">{currentAlert.machine.name}</div>
      </div>
      <div className="mb-4">
        <label htmlFor="suspected-reason" className="block font-semibold mb-2 text-[15px]">Suspected Reason</label>
        <select
          id="suspected-reason"
          className="block w-64 appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10 bg-white text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition text-base shadow-sm"
          value={suspectedReason}
          onChange={e => setSuspectedReason(e.target.value)}
        >
          <option value="">Select Suspected Reason</option>
          {SUSPECTED_REASONS.map(reason => (
            <option key={reason.id} value={reason.id}>{reason.value}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="action-required" className="block font-semibold mb-2 text-[15px]">Action Required</label>
        <select
          id="action-required"
          className="block w-64 appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10 bg-white text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition text-base shadow-sm"
          value={action}
          onChange={e => setAction(e.target.value)}
        >
          <option value="">Select Action</option>
          {ACTIONS.map(act => (
            <option key={act.id} value={act.id}>{act.value}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="comments" className="block font-semibold mb-2 text-[15px]">Comments</label>
        <textarea
          id="comments"
          className="block w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition text-base shadow-sm min-h-[80px]"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </div>
      <button
        className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg transition ${updating ? 'opacity-60 cursor-not-allowed' : ''}`}
        onClick={handleUpdate}
        disabled={updating}
      >
        {updating ? 'UPDATING...' : 'UPDATE'}
      </button>
    </div>
  );
} 