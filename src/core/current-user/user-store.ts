import { signal } from '@angular/core';
import { IUserInfo } from '../interfaces/iauth';
import { EncryptionService } from '../services/helper-services/encryption.service';
import { environment } from '../../environments/environment';

export class UserStore {
  private constructor() {}

  private static readonly key = environment.UserInfoSecretKey;
  private static readonly storageKey = environment.UserInfoStorageKey;

  static UserId = signal<number | null>(null);
  static Username = signal<string | null>(null);
  static Role = signal<string | null>(null);
  static FullName = signal<string | null>(null);

  static hasRole(reqRoles: string[]): boolean {
    return reqRoles.includes(UserStore.Role()!);
  }

  static setUser(user: IUserInfo): void {
    UserStore.UserId.set(user.Id);
    UserStore.Username.set(user.UserName);
    UserStore.Role.set(user.Role);
    UserStore.FullName.set(user.Name);
  }

  static getUser(): IUserInfo | null {
  const Id = UserStore.UserId();
  const UserName = UserStore.Username();
  const Role = UserStore.Role();
  const Name = UserStore.FullName();

 
  if (Id && UserName && Role && Name) {
    return { Id, UserName, Role, Name };
  }

  const stored = localStorage.getItem(UserStore.storageKey);
  if (!stored) return null;

  try {
    const decrypted = EncryptionService.decrypt(stored, UserStore.key);
    if (!decrypted || decrypted.trim() === "") return null;

    const parsed: IUserInfo = JSON.parse(decrypted);
    UserStore.setUser(parsed);
    return parsed;
  } catch (err) {
    UserStore.clearUser(); 
    return null;
  }
}


  static clearUser(): void {
    UserStore.UserId.set(null);
    UserStore.Username.set(null);
    UserStore.Role.set(null);
    UserStore.FullName.set(null);
    localStorage.removeItem(UserStore.storageKey);
  }
}
