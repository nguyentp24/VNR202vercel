export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
  highlight?: boolean;
  details?: string;
  keyPoints?: string[];
}

export interface LeadershipPoint {
  id: number;
  title: string;
  quote: string;
  content: string;
  example: string;
  icon: 'Book' | 'Users' | 'Swords' | 'Flame' | 'Flag';
}

export interface MapPoint {
  id: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  label: string;
  desc: string;
  type?: 'capital' | 'military' | 'navy' | 'route' | 'base' | 'special' | 'city' | 'uprising' | 'battle';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
  explanation: string;
}