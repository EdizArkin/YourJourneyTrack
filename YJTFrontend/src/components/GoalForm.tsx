import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { GoalFormData } from '../types';

interface GoalFormProps {
  onSubmit: (goalData: GoalFormData) => void;
}

export function GoalForm({ onSubmit }: GoalFormProps) {
  const [formData, setFormData] = useState<GoalFormData>({
    title: '',
    description: '',
    targetDate: '',
    durationInDays: 1,
    totalPomodoros: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      targetDate: '',
      durationInDays: 1,
      totalPomodoros: null
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Hedef Başlığı
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Hedef Açıklaması
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          rows={3}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="durationInDays" className="block text-sm font-medium text-gray-700 mb-1">
            Hedef Süresi (Gün)
          </label>
          <input
            type="number"
            id="durationInDays"
            value={formData.durationInDays}
            onChange={(e) => setFormData({ ...formData, durationInDays: parseInt(e.target.value) })}
            min="1"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="pomodoros" className="block text-sm font-medium text-gray-700 mb-1">
            Günlük Pomodoro (Opsiyonel)
          </label>
          <input
            type="number"
            id="pomodoros"
            value={formData.totalPomodoros || ''}
            onChange={(e) => setFormData({ ...formData, totalPomodoros: e.target.value ? parseInt(e.target.value) : null })}
            min="1"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>
      <div>
        <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 mb-1">
          Başlangıç Tarihi
        </label>
        <input
          type="date"
          id="targetDate"
          value={formData.targetDate}
          onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center"
      >
        <Plus className="w-5 h-5 mr-2" />
        Yeni Hedef Ekle
      </button>
    </form>
  );
}