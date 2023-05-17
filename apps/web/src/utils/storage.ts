const handleSessionStorage = (key: string) => {
  return {
    get: () => sessionStorage.getItem(key) ?? null,
    set: (newKey: string) => sessionStorage.setItem(key, newKey),
    remove: () => sessionStorage.removeItem(key),
  }
}

export default handleSessionStorage
