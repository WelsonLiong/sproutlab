import {activeProfile, persist} from './grove-progress.js';

const key = profile => `sprout-nico-story-v1-${profile.id}`;

export function completedCampaign(profile = activeProfile()) {
  if (!profile) return null;
  try {
    const saved = JSON.parse(localStorage.getItem(key(profile)) || 'null');
    if (saved?.phase !== 'complete') return null;
    return {
      name: profile.completionName || profile.name,
      completedAt: saved.completedAt || null,
    };
  } catch {
    return null;
  }
}

export function updateCompletionName(value, profile = activeProfile()) {
  if (!profile) return;
  profile.completionName = String(value || '').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 40) || profile.name;
  persist();
}
