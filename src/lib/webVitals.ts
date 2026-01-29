'use client';

import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals';
import { trackEvent } from './analytics';

function sendToGA(metric: Metric) {
  trackEvent('web_vitals', {
    metric_name: metric.name,
    metric_value: Math.round(metric.value),
    metric_delta: Math.round(metric.delta),
    metric_id: metric.id,
    metric_rating: metric.rating,
  });
}

export function reportWebVitals() {
  if (typeof window === 'undefined') return;

  onCLS(sendToGA);
  onINP(sendToGA);
  onLCP(sendToGA);
  onFCP(sendToGA);
  onTTFB(sendToGA);
}
