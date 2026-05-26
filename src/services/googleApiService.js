/**
 * Google API Service
 * Handles all Google API integrations for clinical insights
 */

import { AI_FEEDBACK_BY_CONDITION } from '../utils/constants'

class GoogleApiService {
  /**
   * Fetch patient insights based on condition
   */
  fetchPatientInsights(condition) {
    return AI_FEEDBACK_BY_CONDITION[condition] || {
      focus: 'Maintain current treatment plan and monitor progress.',
      nextIdeas: [
        'Continue with structured exercises.',
        'Monitor pain and mobility levels.',
        'Schedule follow-up assessment.',
      ],
      caution: 'Follow clinical guidelines.',
    }
  }

  /**
   * Generate report summary from patient data
   */
  generateReportSummary(patient, sessions) {
    const sessionCount = sessions.length
    const avgPain =
      sessions.length > 0
        ? (sessions.reduce((sum, s) => sum + (s.painLevel || 0), 0) /
            sessions.length).toFixed(1)
        : 0

    return {
      title: `${patient.name} - Progress Report`,
      summary: `Patient has completed ${sessionCount} sessions. Current pain level: ${avgPain}/10.`,
      recommendations: [
        'Continue with current treatment protocol.',
        'Focus on consistency in home exercises.',
        'Schedule reassessment in 2 weeks.',
      ],
    }
  }

  /**
   * Analyze session notes using AI
   */
  analyzeSessionNotes(notes) {
    const keywords = {
      pain: ['pain', 'ache', 'discomfort', 'sore'],
      improvement: ['better', 'improved', 'progress', 'stronger'],
      concern: ['worse', 'aggravated', 'declined', 'concern'],
    }

    let analysis = {
      sentiment: 'neutral',
      highlights: [],
      concerns: [],
    }

    const lower = notes.toLowerCase()

    if (keywords.improvement.some((w) => lower.includes(w))) {
      analysis.sentiment = 'positive'
      analysis.highlights.push('Patient showing positive progress')
    }

    if (keywords.concern.some((w) => lower.includes(w))) {
      analysis.sentiment = 'caution'
      analysis.concerns.push('Monitor next session closely')
    }

    return analysis
  }

  /**
   * Get treatment recommendations (simulated AI)
   */
  getTreatmentRecommendations(patient) {
    const recommendations = {
      'Post-op ACL rehabilitation': [
        'Focus on knee extension control',
        'Progressive unilateral loading',
        'Neuromuscular deceleration training',
      ],
      'Chronic lower back pain': [
        'Core endurance progression',
        'Anti-rotation exercises',
        'Pain-guided mobility work',
      ],
      'Shoulder impingement syndrome': [
        'Scapular stabilization drills',
        'Rotator cuff strengthening',
        'Overhead ROM progression',
      ],
    }

    return recommendations[patient.condition] || [
      'Continue current protocol',
      'Monitor patient response',
      'Adjust intensity as needed',
    ]
  }
}

export const googleApiService = new GoogleApiService()
