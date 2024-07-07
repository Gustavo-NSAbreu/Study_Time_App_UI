import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_INFO_KEY = 'STUDY_TIME_USER_ID';

export interface UserInfo {
  id: number;
  name: string;
}

export async function setUserInfo(userInfo: UserInfo) {
  try {
    await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  } catch (error) {
    console.error('Error setting item:', error);
  }
};

export async function getUserInfo(): Promise<UserInfo | null> {
  try {
    const value = await AsyncStorage.getItem(USER_INFO_KEY);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};

export async function clearUserInfo() {
  try {
    await AsyncStorage.removeItem(USER_INFO_KEY);
  } catch (error) {
    console.error('Error removing item:', error);
  }
};