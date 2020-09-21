import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:3000/'
  baseURL: 'https://products.kofastools.com/'
});

export default {
  async getGlobalDiscounts() {
    const response = await axiosInstance.get('global-discounts')
    const discounts = response.data.data.discounts.reduce((acc, current) => {
      const items = ['products', 'category', 'banner'];
      const validForAll = items.every(item => current[item].length === 0);
      if (validForAll) {
        acc['all'] = { value: current.value }
      } else {
        if (current.products.length > 0) {
          const items = current.products
          items.map((item) => {
            acc[item] = { value: current.value };
          })
        }
        if (current.category.length > 0) {
          const items = current.category
          items.map((item) => {
            acc[item] = { value: current.value };
          })
        }
        if (current.banner.length > 0) {
          const items = current.banner
          items.map((item) => {
            acc[item] = { value: current.value };
          })
        }
      }
      return acc
    }, {})
    console.log('discounts returned: ', discounts);
    return discounts;
  },
  async getBanners() {
    const response = await axiosInstance.get('banners')
    const banners = response.data.data.banners;
    return { banners: banners ?? [] };
  },
  async getCategories(page = 1) {
    const response = await axiosInstance.get(`categories?page=${page}&limit=4`)
    const categories = response.data.data.categories;
    return { categories: categories ?? [] };
  },
  async getLastProducts() {
    const response = await axiosInstance.get('products?page=1&limit=4')
    const products = response.data.data.products;
    return { products: products ?? [] };
  },
  async getProducts(page) {
    const response = await axiosInstance.get(`products?page=${page}&limit=4`)
    const products = response.data.data.products;
    return products ?? [];
  },
  async searchProductsByName(name, page = 1) {
    try {
      const response = await axiosInstance.get(`products-search/${name}?page=${page}&limit=10`)
      const products = response.data.data.products
      return products ?? [];
    } catch (error) {
      console.log(error)
    }
  },
  async getProductsOfCategory(name, page = 1) {
    try {
      const response = await axiosInstance.get(`products/${name}?page=${page}&limit=10`)
      const products = response.data.data.products;
      return products ?? [];
    } catch (error) {
      console.log(error)
      return []
    }
  },
  async getStock(uid) {
    try {
      const response = await axiosInstance.get(`/product-stocks?product=${uid}&page=1&limit=100`)
      const stocks = response.data.data.stocks
      return stocks ?? [];
    } catch (error) {
      console.log(error);
    }
  }
}