import { User } from '../types';

export interface UserWithPassword extends User {
  password: string;
}

export const userService = {
  getAll: (): UserWithPassword[] => {
    const stored = localStorage.getItem('systemUsers');
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  },

  getById: (id: number): UserWithPassword | undefined => {
    const users = userService.getAll();
    return users.find((u) => u.id === id);
  },

  create: (user: Omit<UserWithPassword, 'id'>): UserWithPassword => {
    const users = userService.getAll();
    const newUser = {
      ...user,
      id: Math.max(0, ...users.map((u) => u.id)) + 1,
    };
    users.push(newUser);
    localStorage.setItem('systemUsers', JSON.stringify(users));
    return newUser;
  },

  update: (id: number, updates: Partial<UserWithPassword>): UserWithPassword | null => {
    const users = userService.getAll();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    users[index] = { ...users[index], ...updates };
    localStorage.setItem('systemUsers', JSON.stringify(users));
    return users[index];
  },

  changePassword: (id: number, newPassword: string): boolean => {
    const users = userService.getAll();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return false;

    users[index].password = newPassword;
    localStorage.setItem('systemUsers', JSON.stringify(users));
    return true;
  },

  toggleActive: (id: number): boolean => {
    const users = userService.getAll();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return false;

    users[index].isActive = !users[index].isActive;
    localStorage.setItem('systemUsers', JSON.stringify(users));
    return true;
  },

  delete: (id: number): boolean => {
    const users = userService.getAll();
    const filteredUsers = users.filter((u) => u.id !== id);
    if (filteredUsers.length === users.length) return false;

    localStorage.setItem('systemUsers', JSON.stringify(filteredUsers));
    return true;
  },
};
