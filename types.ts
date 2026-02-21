
export enum AppStatus {
  ACTIVE = 'Активна',
  WAITING = 'Ожидает',
  COMPLETED = 'Завершено'
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface Application {
  id: number;
  telegram: string;
  name: string;
  phone: string;
  city: string;
  specialty: string;
  experience: number;
  updated: string;
}

export interface Vacancy {
  id: number;
  title: string;
  category: string;
  city: string;
  salary: string;
  source: string;
  status: AppStatus;
}

export interface User {
  id: number;
  telegramId: string;
  name: string;
  username: string;
  phone: string;
  city: string;
  role: UserRole;
  registrationDate: string;
}

export interface Subscription {
  id: number;
  user: string;
  type: string;
  amount: string;
  startDate: string;
  endDate: string;
  status: string;
  source: string;
}

export interface Feedback {
  id: number;
  user: string;
  message: string;
  status: 'Новое' | 'В обработке' | 'Решено';
  date: string;
}

export interface PointsEntry {
  id: number;
  telegramId: string;
  type: 'Начисление' | 'Списание';
  amount: number;
  reason: string;
  date: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  isActive: boolean;
}

export interface Payout {
  id: number;
  user: string;
  telegramId: string;
  amount: number;
  points: number;
  method: string;
  status: 'Ожидает' | 'Выплачено' | 'Отклонено';
  date: string;
}
