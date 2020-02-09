const KEY = 'hm-toutiao-pc-91-user'
export default {
  setUser(user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser() {
    return JSON.parse(window.sessionStorage.getItem(KEY)) || {}
  },
  delUser() {
    window.sessionStorage.removeItem(KEY)
  }
}