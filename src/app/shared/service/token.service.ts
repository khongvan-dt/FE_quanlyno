export async function getToken(): Promise<string | null> {
  let token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  const tokenParts = token.split('.');
  const payload = JSON.parse(atob(tokenParts[1]));
  const exp = payload.exp * 1000; // Chuyển đổi thời gian hết hạn sang milliseconds

  if (Date.now() >= exp) {
    token = await refreshToken();
  }

  return token;
}



export function getUserIdFromToken(token: string): string {
  const tokenParts = token.split('.');
  const payload = JSON.parse(atob(tokenParts[1]));
  return payload.userId;
}

async function refreshToken() {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  const response = await fetch('/api/authenticate/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, refreshToken }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem('token', data.Token);
    localStorage.setItem('refreshToken', data.RefreshToken);
    return data.Token;
  } else {
    console.error('Refresh token failed:', data.Message);
    return null;
  }
}
