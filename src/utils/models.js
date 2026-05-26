/**
 * Data Models - Standardized across the application
 */

export const PatientModel = {
  create: (data) => ({
    id: data.id || Date.now(),
    name: data.name || '',
    age: data.age || 0,
    condition: data.condition || '',
    notes: data.notes || '',
    adherence: data.adherence || 0,
    painLevel: data.painLevel || 0,
    mobility: data.mobility || 0,
    lastSession: data.lastSession || '',
    nextSession: data.nextSession || '',
    goals: data.goals || [],
    updates: data.updates || [],
    createdAt: data.createdAt || new Date().toISOString(),
  }),
}

export const SessionModel = {
  create: (data) => ({
    id: data.id || Date.now(),
    patientId: data.patientId || null,
    date: data.date || new Date().toISOString(),
    notes: data.notes || '',
    duration: data.duration || 0,
    exercises: data.exercises || [],
    observations: data.observations || '',
    createdAt: data.createdAt || new Date().toISOString(),
  }),
}

export const ReportModel = {
  create: (data) => ({
    id: data.id || Date.now(),
    patientId: data.patientId || null,
    summary: data.summary || '',
    progress: data.progress || '',
    recommendations: data.recommendations || [],
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
  }),
}

export const UserModel = {
  create: (data) => ({
    id: data.id || Date.now(),
    name: data.name || '',
    email: data.email || '',
    role: data.role || 'physio',
    avatar: data.avatar || '',
    createdAt: data.createdAt || new Date().toISOString(),
  }),
}
