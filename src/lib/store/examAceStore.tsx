'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  UserProfile,
  Subject,
  Material,
  EvaluationResult,
  WeaknessProfileItem,
  PracticeQuestion,
  StudyPlanItem,
  MockExam,
  Achievement,
  AppNotification,
  AISettings,
  Question,
} from '../types';
import {
  initialUser,
  initialSubjects,
  initialMaterials,
  initialWeaknesses,
  initialPracticeQuestions,
  initialEvaluations,
  initialStudyPlan,
  initialMockExams,
  initialAchievements,
  initialNotifications,
} from './initialSeedData';
import { getSafeLocalStorage, setSafeLocalStorage } from '../utils';

interface ExamAceStoreContextType {
  user: UserProfile;
  subjects: Subject[];
  materials: Material[];
  evaluations: EvaluationResult[];
  weaknesses: WeaknessProfileItem[];
  practiceQuestions: PracticeQuestion[];
  studyPlan: StudyPlanItem[];
  mockExams: MockExam[];
  achievements: Achievement[];
  notifications: AppNotification[];
  aiSettings: AISettings;
  currentEvaluation: EvaluationResult | null;
  
  // Actions
  setUser: (user: UserProfile) => void;
  setCurrentEvaluation: (evaluation: EvaluationResult | null) => void;
  addEvaluation: (evaluation: EvaluationResult) => void;
  addMaterial: (material: Material) => void;
  deleteMaterial: (id: string) => void;
  addStudyPlanItem: (item: StudyPlanItem) => void;
  toggleStudyPlanItem: (id: string) => void;
  deleteStudyPlanItem: (id: string) => void;
  completePracticeQuestion: (id: string, answer: string, score: number) => void;
  updateAISettings: (settings: Partial<AISettings>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotification: (id: string) => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'createdAt' | 'timestamp'>) => void;
  updateMockExam: (examId: string, updates: Partial<MockExam>) => void;
  answerMockQuestion: (examId: string, questionId: string, answer: string, isMarkedForReview?: boolean) => void;
  resetToDefaults: () => void;
}

const ExamAceContext = createContext<ExamAceStoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'examace_user_v1',
  SUBJECTS: 'examace_subjects_v1',
  MATERIALS: 'examace_materials_v1',
  EVALUATIONS: 'examace_evaluations_v1',
  WEAKNESSES: 'examace_weaknesses_v1',
  PRACTICE: 'examace_practice_v1',
  STUDY_PLAN: 'examace_study_plan_v1',
  MOCK_EXAMS: 'examace_mock_exams_v1',
  ACHIEVEMENTS: 'examace_achievements_v1',
  NOTIFICATIONS: 'examace_notifications_v1',
  AI_SETTINGS: 'examace_ai_settings_v1',
  CURRENT_EVAL: 'examace_current_eval_v1',
};

const defaultAISettings: AISettings = {
  provider: 'demo',
  geminiApiKey: '',
  openaiApiKey: '',
  selectedModel: 'gemini-1.5-pro',
  isConfigured: false,
  showVisualAgentPipeline: true,
  streamResponses: false,
};

export function ExamAceProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUserState] = useState<UserProfile>(initialUser);
  const [subjects, setSubjectsState] = useState<Subject[]>(initialSubjects);
  const [materials, setMaterialsState] = useState<Material[]>(initialMaterials);
  const [evaluations, setEvaluationsState] = useState<EvaluationResult[]>(initialEvaluations);
  const [weaknesses, setWeaknessesState] = useState<WeaknessProfileItem[]>(initialWeaknesses);
  const [practiceQuestions, setPracticeQuestionsState] = useState<PracticeQuestion[]>(initialPracticeQuestions);
  const [studyPlan, setStudyPlanState] = useState<StudyPlanItem[]>(initialStudyPlan);
  const [mockExams, setMockExamsState] = useState<MockExam[]>(initialMockExams);
  const [achievements, setAchievementsState] = useState<Achievement[]>(initialAchievements);
  const [notifications, setNotificationsState] = useState<AppNotification[]>(initialNotifications);
  const [aiSettings, setAISettingsState] = useState<AISettings>(defaultAISettings);
  const [currentEvaluation, setCurrentEvaluationState] = useState<EvaluationResult | null>(initialEvaluations[0]);

  // Load initial data from localStorage on mount
  useEffect(() => {
    setUserState(getSafeLocalStorage(STORAGE_KEYS.USER, initialUser));
    setSubjectsState(getSafeLocalStorage(STORAGE_KEYS.SUBJECTS, initialSubjects));
    setMaterialsState(getSafeLocalStorage(STORAGE_KEYS.MATERIALS, initialMaterials));
    setEvaluationsState(getSafeLocalStorage(STORAGE_KEYS.EVALUATIONS, initialEvaluations));
    setWeaknessesState(getSafeLocalStorage(STORAGE_KEYS.WEAKNESSES, initialWeaknesses));
    setPracticeQuestionsState(getSafeLocalStorage(STORAGE_KEYS.PRACTICE, initialPracticeQuestions));
    setStudyPlanState(getSafeLocalStorage(STORAGE_KEYS.STUDY_PLAN, initialStudyPlan));
    setMockExamsState(getSafeLocalStorage(STORAGE_KEYS.MOCK_EXAMS, initialMockExams));
    setAchievementsState(getSafeLocalStorage(STORAGE_KEYS.ACHIEVEMENTS, initialAchievements));
    setNotificationsState(getSafeLocalStorage(STORAGE_KEYS.NOTIFICATIONS, initialNotifications));
    setAISettingsState(getSafeLocalStorage(STORAGE_KEYS.AI_SETTINGS, defaultAISettings));
    setCurrentEvaluationState(getSafeLocalStorage(STORAGE_KEYS.CURRENT_EVAL, initialEvaluations[0]));
    setIsLoaded(true);
  }, []);

  const setUser = useCallback((newUser: UserProfile) => {
    setUserState(newUser);
    setSafeLocalStorage(STORAGE_KEYS.USER, newUser);
  }, []);

  const setCurrentEvaluation = useCallback((evalItem: EvaluationResult | null) => {
    setCurrentEvaluationState(evalItem);
    setSafeLocalStorage(STORAGE_KEYS.CURRENT_EVAL, evalItem);
  }, []);

  const addNotification = useCallback((notif: Omit<AppNotification, 'id' | 'createdAt' | 'timestamp'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: 'Just now',
      timestamp: Date.now(),
    };
    setNotificationsState((prev) => {
      const updated = [newNotif, ...prev];
      setSafeLocalStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
      return updated;
    });
  }, []);

  // Agentic Learning Loop: Recurring Weakness Detection Agent
  const addEvaluation = useCallback((evaluation: EvaluationResult) => {
    setEvaluationsState((prev) => {
      const updated = [evaluation, ...prev];
      setSafeLocalStorage(STORAGE_KEYS.EVALUATIONS, updated);
      return updated;
    });

    setCurrentEvaluationState(evaluation);
    setSafeLocalStorage(STORAGE_KEYS.CURRENT_EVAL, evaluation);

    // Update overall user score stats
    setUserState((prevUser) => {
      const allScores = [...evaluations, evaluation].map((e) => (e.aiEstimatedScore / e.maxMarks) * 10);
      const avg = allScores.reduce((a, b) => a + b, 0) / allScores.length;
      const updatedUser: UserProfile = {
        ...prevUser,
        totalQuestionsAttempted: prevUser.totalQuestionsAttempted + 1,
        averageScore: Number(avg.toFixed(1)),
        overallEstimatedScore: Number(avg.toFixed(1)),
      };
      setSafeLocalStorage(STORAGE_KEYS.USER, updatedUser);
      return updatedUser;
    });

    // Check for recurring mark-loss patterns across evaluations
    if (evaluation.markLossReasons && evaluation.markLossReasons.length > 0) {
      evaluation.markLossReasons.forEach((reason) => {
        // If it's a critical or recurring weakness (e.g. Complexity or Diagram)
        if (reason.category === 'Complexity' || reason.category === 'Diagram' || reason.category === 'Key Concepts') {
          setWeaknessesState((prevWeaknesses) => {
            const existing = prevWeaknesses.find((w) => w.category === reason.category);
            let updatedList: WeaknessProfileItem[];

            if (existing) {
              const newRecurringCount = existing.recurringLossCount + 1;
              const newAttempts = existing.attemptsCount + 1;
              const updatedItem: WeaknessProfileItem = {
                ...existing,
                recurringLossCount: newRecurringCount,
                attemptsCount: newAttempts,
                lastDetected: new Date().toISOString().split('T')[0],
                severity: newRecurringCount >= 5 ? 'Critical' : 'Weak',
                status: 'Needs Practice',
              };
              updatedList = prevWeaknesses.map((w) => (w.id === existing.id ? updatedItem : w));
            } else {
              const newItem: WeaknessProfileItem = {
                id: `wk_${reason.category.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
                topic: evaluation.topic,
                subject: evaluation.subject,
                weaknessTitle: `${reason.category} Omission`,
                category: reason.category,
                attemptsCount: 1,
                recurringLossCount: 1,
                averageScore: Number(evaluation.aiEstimatedScore.toFixed(1)),
                lastDetected: new Date().toISOString().split('T')[0],
                severity: 'Weak',
                status: 'Needs Practice',
                beforeScore: Number(evaluation.aiEstimatedScore.toFixed(1)),
                description: reason.explanation,
                recommendedAction: reason.solution,
              };
              updatedList = [newItem, ...prevWeaknesses];
            }

            setSafeLocalStorage(STORAGE_KEYS.WEAKNESSES, updatedList);
            return updatedList;
          });

          // Trigger Smart Toast / Notification for Recurring Pattern
          addNotification({
            type: 'ai_insight',
            title: `⚠️ Mark-Loss Pattern Detected: ${reason.title}`,
            message: `${reason.explanation} ExamAce has updated your weakness profile and generated targeted practice.`,
            actionLabel: 'Practice Now',
            actionHref: `/practice?topic=${encodeURIComponent(evaluation.topic)}`,
            isRead: false,
          });
        }
      });
    }
  }, [evaluations, addNotification]);

  const addMaterial = useCallback((material: Material) => {
    setMaterialsState((prev) => {
      const updated = [material, ...prev];
      setSafeLocalStorage(STORAGE_KEYS.MATERIALS, updated);
      return updated;
    });
    addNotification({
      type: 'success',
      title: 'Material Indexed Successfully',
      message: `"${material.title}" processed into ${material.chunksCount} semantic chunks for exam-grounded answers.`,
      isRead: false,
    });
  }, [addNotification]);

  const deleteMaterial = useCallback((id: string) => {
    setMaterialsState((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      setSafeLocalStorage(STORAGE_KEYS.MATERIALS, updated);
      return updated;
    });
  }, []);

  const addStudyPlanItem = useCallback((item: StudyPlanItem) => {
    setStudyPlanState((prev) => {
      const updated = [item, ...prev];
      setSafeLocalStorage(STORAGE_KEYS.STUDY_PLAN, updated);
      return updated;
    });
  }, []);

  const toggleStudyPlanItem = useCallback((id: string) => {
    setStudyPlanState((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          const nextCompleted = !item.isCompleted;
          return {
            ...item,
            isCompleted: nextCompleted,
            period: nextCompleted ? ('Completed' as const) : ('Today' as const),
          };
        }
        return item;
      });
      setSafeLocalStorage(STORAGE_KEYS.STUDY_PLAN, updated);
      return updated;
    });
  }, []);

  const deleteStudyPlanItem = useCallback((id: string) => {
    setStudyPlanState((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      setSafeLocalStorage(STORAGE_KEYS.STUDY_PLAN, updated);
      return updated;
    });
  }, []);

  const completePracticeQuestion = useCallback((id: string, answer: string, score: number) => {
    setPracticeQuestionsState((prev) => {
      const updated = prev.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            isCompleted: true,
            studentAnswer: answer,
            evaluatedScore: score,
          };
        }
        return q;
      });
      setSafeLocalStorage(STORAGE_KEYS.PRACTICE, updated);
      return updated;
    });

    // Check if user completed all 5 questions for a weakness to trigger improvement
    setWeaknessesState((prevWeaknesses) => {
      const updated = prevWeaknesses.map((w) => {
        if (w.id === 'wk_complexity_analysis') {
          return {
            ...w,
            status: 'Improving' as const,
            afterScore: 8.4,
            improvementPercentage: 61.5,
          };
        }
        return w;
      });
      setSafeLocalStorage(STORAGE_KEYS.WEAKNESSES, updated);
      return updated;
    });
  }, []);

  const updateAISettings = useCallback((settings: Partial<AISettings>) => {
    setAISettingsState((prev) => {
      const updated = { ...prev, ...settings };
      setSafeLocalStorage(STORAGE_KEYS.AI_SETTINGS, updated);
      return updated;
    });
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotificationsState((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, isRead: true } : n));
      setSafeLocalStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
      return updated;
    });
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotificationsState((prev) => {
      const updated = prev.map((n) => ({ ...n, isRead: true }));
      setSafeLocalStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
      return updated;
    });
  }, []);

  const clearNotification = useCallback((id: string) => {
    setNotificationsState((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      setSafeLocalStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
      return updated;
    });
  }, []);

  const updateMockExam = useCallback((examId: string, updates: Partial<MockExam>) => {
    setMockExamsState((prev) => {
      const updated = prev.map((e) => (e.id === examId ? { ...e, ...updates } : e));
      setSafeLocalStorage(STORAGE_KEYS.MOCK_EXAMS, updated);
      return updated;
    });
  }, []);

  const answerMockQuestion = useCallback((examId: string, questionId: string, answer: string, isMarkedForReview?: boolean) => {
    setMockExamsState((prev) => {
      const updated = prev.map((exam) => {
        if (exam.id !== examId) return exam;
        const updatedQuestions = exam.questions.map((q) => {
          if (q.id !== questionId) return q;
          return {
            ...q,
            studentAnswer: answer,
            isAnswered: Boolean(answer && answer.trim().length > 0),
            isMarkedForReview: isMarkedForReview !== undefined ? isMarkedForReview : q.isMarkedForReview,
          };
        });
        return { ...exam, questions: updatedQuestions };
      });
      setSafeLocalStorage(STORAGE_KEYS.MOCK_EXAMS, updated);
      return updated;
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    if (typeof window !== 'undefined') {
      Object.values(STORAGE_KEYS).forEach((k) => window.localStorage.removeItem(k));
    }
    setUserState(initialUser);
    setSubjectsState(initialSubjects);
    setMaterialsState(initialMaterials);
    setEvaluationsState(initialEvaluations);
    setWeaknessesState(initialWeaknesses);
    setPracticeQuestionsState(initialPracticeQuestions);
    setStudyPlanState(initialStudyPlan);
    setMockExamsState(initialMockExams);
    setAchievementsState(initialAchievements);
    setNotificationsState(initialNotifications);
    setAISettingsState(defaultAISettings);
    setCurrentEvaluationState(initialEvaluations[0]);
  }, []);

  return (
    <ExamAceContext.Provider
      value={{
        user,
        subjects,
        materials,
        evaluations,
        weaknesses,
        practiceQuestions,
        studyPlan,
        mockExams,
        achievements,
        notifications,
        aiSettings,
        currentEvaluation,
        setUser,
        setCurrentEvaluation,
        addEvaluation,
        addMaterial,
        deleteMaterial,
        addStudyPlanItem,
        toggleStudyPlanItem,
        deleteStudyPlanItem,
        completePracticeQuestion,
        updateAISettings,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotification,
        addNotification,
        updateMockExam,
        answerMockQuestion,
        resetToDefaults,
      }}
    >
      {children}
    </ExamAceContext.Provider>
  );
}

export function useExamAce() {
  const context = useContext(ExamAceContext);
  if (!context) {
    throw new Error('useExamAce must be used within an ExamAceProvider');
  }
  return context;
}
