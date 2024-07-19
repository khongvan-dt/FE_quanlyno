export function getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  export function getUserIdFromToken(token: string): string {
    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload.userId;
  }
  