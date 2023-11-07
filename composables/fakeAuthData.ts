let currentUser: { email: string } | null = null; // Здесь хранится текущий пользователь
let accessToken: string | null = null; // Здесь хранится access token
let refreshToken: string | null = null; // Здесь хранится refresh token

// Функция для аутентификации (здесь можно использовать эмулированные данные)
export const login = (email: string, password: string): boolean => {
  if (email === "test@example.com" && password === "password") {
    // Создайте и сохраните access token и refresh token
    accessToken = "fake_access_token";
    refreshToken = "fake_refresh_token";

    // Установите текущего пользователя
    currentUser = { email };
    return true;
  }
  return false;
}

// Функция для выхода из системы
export const logout = (): void => {
  // Удалите access token, refresh token и текущего пользователя
  accessToken = null;
  refreshToken = null;
  currentUser = null;
}

// Функция для проверки авторизации
export const isAuthenticated = (): boolean => {
  return !!accessToken;
}

// Получение текущего пользователя
export const getCurrentUser = (): { email: string } | null => {
  return currentUser;
}
