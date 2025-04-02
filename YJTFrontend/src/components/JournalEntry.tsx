import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface JournalEntryProps {
  onSave: (content: string) => void;
}

export function JournalEntry({ onSave }: JournalEntryProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSave(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your daily reflection..."
          className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
          rows={4}
        />
        <button
          type="submit"
          className="absolute bottom-4 right-4 text-emerald-500 hover:text-emerald-600"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}