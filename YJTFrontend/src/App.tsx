import React, { useState } from 'react';
import { Timer } from './components/Timer';
import { PlantGrowth } from './components/PlantGrowth';
import { JournalEntry } from './components/JournalEntry';
import { GoalForm } from './components/GoalForm';
import { GoalList } from './components/GoalList'; // GoalList'i içeri aktarıyoruz
import { GrowingPlants } from './components/GrowingPlants';
import { Goal, JournalEntry as JournalEntryType, GoalFormData } from './types';
import { Target, Calendar, Settings, Clock } from 'lucide-react';

function App() {
  const [goals, setGoals] = useState<Goal[]>([{
    id: '1',
    title: 'Örnek Hedef',
    description: 'Bu bir örnek hedeftir',
    targetDate: '2024-03-31',
    durationInDays: 7,
    completedPomodoros: 0,
    totalPomodoros: null,
    journalEntries: [],
    plantStage: 0,
    isActive: true
  }]);

  const [showConfig, setShowConfig] = useState(false);
  const [activeGoalId, setActiveGoalId] = useState('1');

  const handleAddGoal = (goalData: GoalFormData) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      ...goalData,
      completedPomodoros: 0,
      plantStage: 0,
      journalEntries: [],
      isActive: false
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const handleSelectGoal = (goalId: string) => {
    setActiveGoalId(goalId);
    setShowConfig(false);
  };

  const currentGoal = goals.find(g => g.id === activeGoalId)!;

  const handlePomodoroComplete = () => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === activeGoalId) {
        return {
          ...goal,
          completedPomodoros: goal.completedPomodoros + 1,
          plantStage: goal.plantStage + 1,
        };
      }
      return goal;
    }));
  };

  const handleJournalEntry = (content: string) => {
    const newEntry: JournalEntryType = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content,
      pomodorosCompleted: currentGoal.completedPomodoros,
    };

    setGoals(prev => prev.map(goal => {
      if (goal.id === activeGoalId) {
        return {
          ...goal,
          journalEntries: [newEntry, ...goal.journalEntries],
        };
      }
      return goal;
    }));
  };

  const startDate = new Date(currentGoal.targetDate);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + currentGoal.durationInDays);

  return (
    <div className="min-h-screen bg-gray-50">
      <GrowingPlants />

      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-4xl mx-auto p-4">
          <Timer onComplete={handlePomodoroComplete} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 pt-40 relative z-10">
        <header className="text-center mb-12">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors flex items-center mx-auto"
          >
            <Settings className="w-5 h-5 mr-2" />
            {showConfig ? 'Hedefe Dön' : 'Hedefleri Yönet'}
          </button>
        </header>

        {showConfig ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-6">Yeni Hedef Ekle</h2>
              <GoalForm onSubmit={handleAddGoal} />
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-6">Hedeflerim</h2>
              <GoalList
                goals={goals} // Goals listesi buraya geliyor
                onSelectGoal={handleSelectGoal} // Hedef seçme fonksiyonu
                activeGoalId={activeGoalId} // Aktif hedef ID
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Target className="w-6 h-6 text-emerald-500 mr-2" />
                  <h2 className="text-xl font-semibold">Aktif Hedef</h2>
                </div>
                <h3 className="text-lg font-medium mb-2">{currentGoal.title}</h3>
                <p className="text-gray-600 mb-4">{currentGoal.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Başlangıç: {startDate.toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{currentGoal.durationInDays} gün</span>
                  </div>
                </div>
                {currentGoal.totalPomodoros && (
                  <div className="mt-2 text-sm text-gray-500">
                    Günlük Hedef: {currentGoal.totalPomodoros} pomodoro
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <PlantGrowth 
                  stage={currentGoal.plantStage} 
                  totalStages={currentGoal.totalPomodoros 
                    ? currentGoal.totalPomodoros * currentGoal.durationInDays 
                    : currentGoal.durationInDays * 4
                  } 
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-6">Günlük Notlar</h2>
              <JournalEntry onSave={handleJournalEntry} />
              <div className="mt-8 space-y-4">
                {currentGoal.journalEntries.map((entry) => (
                  <div key={entry.id} className="border-l-4 border-emerald-500 pl-4 py-2">
                    <p className="text-sm text-gray-500 mb-1">
                      {new Date(entry.date).toLocaleDateString('tr-TR')}
                    </p>
                    <p className="text-gray-700">{entry.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
