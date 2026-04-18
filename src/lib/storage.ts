// localStorage helpers for Cyber ABC app

export interface SecurityAnswers {
  childrenCount: string;
  favoriteColor: string;
  birthCountry: string;
  carBrand: string;
  motherName: string;
}

export interface UserProfile {
  role: 'child' | 'parent';
  childName: string;
  childAge: string;
  parentName: string;
  parentPhone: string;
  parentPassword: string;
  securityAnswers?: SecurityAnswers;
}

export interface GameStats {
  alphabetCompleted: boolean;
  alphabetProgress: number; // last completed letter index
  passwordGamesPlayed: number;
  forestGamesPlayed: number;
  jungleGamesPlayed: number;
  jungleCleanWins: number; // wins without errors
  totalGamesPlayed: number;
  timeSpentMinutes: number;
}

export interface TimerSettings {
  enabled: boolean;
  minutes: number;
  startedAt: number | null;
}

const PROFILE_KEY = 'cyber_abc_profile';
const STATS_KEY = 'cyber_abc_stats';
const TIMER_KEY = 'cyber_abc_timer';

export const getProfile = (): UserProfile | null => {
  const data = localStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveProfile = (profile: UserProfile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const getStats = (): GameStats => {
  const data = localStorage.getItem(STATS_KEY);
  return data ? JSON.parse(data) : {
    alphabetCompleted: false,
    alphabetProgress: -1,
    passwordGamesPlayed: 0,
    forestGamesPlayed: 0,
    jungleGamesPlayed: 0,
    jungleCleanWins: 0,
    totalGamesPlayed: 0,
    timeSpentMinutes: 0,
  };
};

export const saveStats = (stats: GameStats) => {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

export const getTimer = (): TimerSettings => {
  const data = localStorage.getItem(TIMER_KEY);
  return data ? JSON.parse(data) : { enabled: false, minutes: 30, startedAt: null };
};

export const saveTimer = (timer: TimerSettings) => {
  localStorage.setItem(TIMER_KEY, JSON.stringify(timer));
};

export const ALPHABET = [
  'а','б','в','г','д','е','ж','з','и','к',
  'л','м','н','о','п','р','с','т','у','ф',
  'х','ц','ч','ш','щ','э','ю','я'
] as const;

export const getLetterImage = (letter: string): string => {
  if (letter === 'а') return '/images/letter_a.png';
  return `/images/letter_${letter}.png`;
};
