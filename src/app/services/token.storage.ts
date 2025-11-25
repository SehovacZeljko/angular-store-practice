export class TokenStorage {
  private static readonly KEY = 'auth_token';

  static set(token: string): void {
    localStorage.setItem(this.KEY, token);
  }

  static get(): string | null {
    return localStorage.getItem(this.KEY);
  }

  static clear(): void {
    localStorage.removeItem(this.KEY);
  }

  static hasToken(): boolean {
    return !!this.get();
  }
}