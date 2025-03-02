 let EXPIRESTIME = 3600 * 24 * 1000 * 2; // 过期时效：2天

class LocalCache {
  setCache(key, value, expire = EXPIRESTIME) {
    const data = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire : null
    });
    window.localStorage.setItem(key, data); // value转字符串
  }

  getCache(key) {
    const item = window.localStorage.getItem(key);
    if (item) {
      const data = JSON.parse(item);
      const { value, expire } = data;
      // 在有效期内直接返回
      if (expire === null || expire >= Date.now()) {
        return value;
      } 
      this.removeCache("token");
    }
  }

  removeCache(key) {
    window.localStorage.removeItem(key);
  }

  clearCache() {
    window.localStorage.clear();
  }
}

export default new LocalCache();
