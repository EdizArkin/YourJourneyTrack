import React from 'react';
import { Goal } from '../types';
import { CheckCircle, Circle, Calendar, Target, Clock } from 'lucide-react';

interface GoalListProps {
  goals: Goal[];
  onSelectGoal: (goalId: string) => void;
  activeGoalId: string;
}

export function GoalList({ goals, onSelectGoal, activeGoalId }: GoalListProps) {
  return (
    <div className="space-y-4">
      {goals.map((goal) => {
        const startDate = new Date(goal.targetDate);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + goal.durationInDays);

        return (
          <div
            key={goal.id}
            className={`bg-white rounded-lg p-4 shadow-md cursor-pointer transition-all ${
              activeGoalId === goal.id ? 'border-2 border-emerald-500' : 'border border-gray-200'
            }`}
            onClick={() => onSelectGoal(goal.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Target className="w-5 h-5 text-emerald-500 mr-2" />
                <h3 className="font-medium">{goal.title}</h3>
              </div>
              {activeGoalId === goal.id ? (
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{startDate.toLocaleDateString('tr-TR')}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{goal.durationInDays} gün</span>
              </div>
              <div>
                Günlük: {goal.totalPomodoros} pomodoro
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}