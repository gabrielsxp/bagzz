import AsyncStorage from '@react-native-community/async-storage';

export default {
  async addToFavorites(productId) {
    return new Promise(async (resolve) => {
      let favorites = await AsyncStorage.getItem('favorites');
      if (!Array.isArray(favorites)) {
        favorites = [];
      }
      if (favorites.length > 0) {
        const existsAlready = favorites.find(f => f.toString() === productId.toString());
        if (typeof existsAlready === 'undefined') {
          favorites = favorites.concat(productId);
          await AsyncStorage.setItem('favorites', favorites);
        }
      } else {
        favorites = favorites.concat(productId.toString());
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        resolve(true);
      }
    })
  },
  async removeFavorite(productId) {
    let favorites = await AsyncStorage.getItem('favorites');
    if (typeof favorites === undefined) {
      favorites = [];
    } else {
      favorites = JSON.parse(favorites);
    }
    return new Promise(async (resolve, reject) => {
      const index = favorites.find(f => f === productId.toString());
      if (index > 0) {
        favorites.splice(index, 1);
        await AsyncStorage.setItem('favorites', favorites);
      }
      resolve(false);
    })
  },
  async isProductFavorited(productId) {
    let favorites = await AsyncStorage.getItem('favorites');
    // console.warn(favorites);
    if (typeof favorites === undefined) {
      favorites = [];
    } else {
      favorites = JSON.parse(favorites);
    }
    return new Promise((resolve, reject) => {
      const exists = favorites.find(f => f === productId.toString());
      if (typeof exists !== 'undefined') {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  },
  async setToken(token) {
    console.log('saving token: ', token);
    await AsyncStorage.setItem('token', JSON.stringify(token));
  },
  async getToken() {
    try {
      const token = await AsyncStorage.getItem('token');
      return JSON.parse(token);
    } catch (error) {
      return null;
    }
  }
};