/**
 * Application constants
 */

export const ROLES = {
  PHYSIO: 'physio',
  PATIENT: 'patient',
  ADMIN: 'admin',
}

export const STORAGE_KEYS = {
  SESSION: 'clinicdocs-session',
  PATIENTS: 'clinicdocs-patients',
  SESSIONS: 'clinicdocs-sessions',
  REPORTS: 'clinicdocs-reports',
}

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PATIENTS: '/patients',
  PATIENT_DETAIL: '/patients/:id',
  SESSIONS: '/sessions',
  SESSION_NEW: '/sessions/new',
  REPORTS: '/reports',
  SETTINGS: '/settings',
}

export const AI_FEEDBACK_BY_CONDITION = {
  'Post-op ACL rehabilitation': {
    focus: 'Prioritize neuromuscular knee control and progressive unilateral loading.',
    nextIdeas: [
      'Add deceleration drills with visual cues to improve movement quality.',
      'Progress from supported to unsupported single-leg Romanian deadlifts.',
      'Use brief fatigue checkpoints to adapt intensity in-session.',
    ],
    caution: 'Monitor valgus collapse during dynamic transitions.',
  },
  'Chronic lower back pain': {
    focus: 'Blend symptom-guided mobility with graded core endurance exposure.',
    nextIdeas: [
      'Introduce anti-rotation holds with breathing tempo control.',
      'Use pain journal prompts to identify aggravating daily patterns.',
      'Progress walking intervals by 10% if next-day symptoms remain stable.',
    ],
    caution: 'Avoid sudden volume spikes when pain exceeds baseline by 2+ points.',
  },
  'Shoulder impingement syndrome': {
    focus: 'Continue scapular coordination and overhead tolerance progression.',
    nextIdeas: [
      'Add eccentric external rotation work at moderate load.',
      'Integrate wall-slide variations with thoracic extension bias.',
      'Introduce sport-specific reaching patterns at submax intensity.',
    ],
    caution: 'Pause overhead progression if sharp anterior pain appears.',
  },
}

export const DEFAULT_PATIENTS = [
  {
    id: 1,
    name: 'Elena Torres',
    condition: 'Post-op ACL rehabilitation',
    adherence: 92,
    painLevel: 3,
    mobility: 74,
    lastSession: 'Apr 18, 2026',
    nextSession: 'Apr 23, 2026',
    goals: ['Restore knee extension', 'Improve single-leg stability'],
    updates: [
      { date: 'Apr 07', note: 'Reduced swelling after adjusted loading protocol.' },
      { date: 'Apr 12', note: 'Single-leg squat control improved by 15%.' },
      { date: 'Apr 18', note: 'Reported better confidence during stairs.' },
    ],
  },
  {
    id: 2,
    name: 'Marco Ruiz',
    condition: 'Chronic lower back pain',
    adherence: 78,
    painLevel: 5,
    mobility: 61,
    lastSession: 'Apr 17, 2026',
    nextSession: 'Apr 22, 2026',
    goals: ['Increase core endurance', 'Reduce morning stiffness'],
    updates: [
      { date: 'Apr 05', note: 'Tolerates 20 min walking with less discomfort.' },
      { date: 'Apr 10', note: 'Trigger points still active in lumbar area.' },
      { date: 'Apr 17', note: 'Needs better consistency in home exercises.' },
    ],
  },
  {
    id: 3,
    name: 'Sofia Mendoza',
    condition: 'Shoulder impingement syndrome',
    adherence: 85,
    painLevel: 2,
    mobility: 81,
    lastSession: 'Apr 19, 2026',
    nextSession: 'Apr 25, 2026',
    goals: ['Full overhead ROM', 'Strengthen rotator cuff'],
    updates: [
      { date: 'Apr 08', note: 'External rotation strength trending up.' },
      { date: 'Apr 14', note: 'Pain-free range reached in frontal plane.' },
      { date: 'Apr 19', note: 'Mild soreness only after high repetitions.' },
    ],
  },
]
