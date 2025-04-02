export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  durationInDays: number;
  completedPomodoros: number;
  totalPomodoros: number | null;
  journalEntries: JournalEntry[];
  plantStage: number;
  isActive: boolean;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  pomodorosCompleted: number;
}

export interface TimerState {
  isRunning: boolean;
  timeLeft: number;
  isBreak: boolean;
}

export interface TimerSettings {
  duration: number;
}

export interface GoalFormData {
  title: string;
  description: string;
  targetDate: string;
  durationInDays: number;
  totalPomodoros: number | null;
}