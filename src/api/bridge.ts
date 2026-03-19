import bridge from '@vkontakte/vk-bridge';
import type { VKUser } from '../types';

// Все bridge.send() централизованы здесь — не вызывай bridge напрямую из компонентов

export async function getUserInfo(): Promise<VKUser | null> {
  try {
    const user = await bridge.send('VKWebAppGetUserInfo');
    return user as VKUser;
  } catch {
    return null;
  }
}

// Получение токена для авторизации на бэкенде
// scope: 'friends,wall,photos' — перечисли нужные права
export async function getAuthToken(appId: number, scope = ''): Promise<string | null> {
  try {
    const { access_token } = await bridge.send('VKWebAppGetAuthToken', { app_id: appId, scope });
    return access_token;
  } catch {
    return null;
  }
}

export async function shareLink(link: string): Promise<void> {
  try {
    await bridge.send('VKWebAppShare', { link });
  } catch {
    // пользователь отменил
  }
}

// Оплата другому пользователю через VK Pay
export async function payToUser(
  appId: number,
  userId: number,
  amount: number,
  description?: string,
): Promise<boolean> {
  try {
    const result = await bridge.send('VKWebAppOpenPayForm', {
      app_id: appId,
      action: 'pay-to-user',
      params: { user_id: userId, amount, description },
    });
    // result: TransactionResult | { result: TransactionResult }
    return 'status' in result ? result.status : result.result.status;
  } catch {
    return false;
  }
}

export async function enableSwipeBack(): Promise<void> {
  await bridge.send('VKWebAppSetSwipeSettings', { history: true });
}

export async function storageGet(keys: string[]): Promise<Record<string, string>> {
  try {
    const { keys: result } = await bridge.send('VKWebAppStorageGet', { keys });
    return Object.fromEntries(result.map(({ key, value }) => [key, value]));
  } catch {
    return {};
  }
}

export async function storageSet(key: string, value: string): Promise<boolean> {
  try {
    await bridge.send('VKWebAppStorageSet', { key, value });
    return true;
  } catch {
    return false;
  }
}
