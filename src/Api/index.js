import axios from 'axios'
import auth from '@/utils/auth'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`
axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${auth.getUser().token}`
  return config
}, err => Promise.reject((err)))
axios.interceptors.response.use(res => res, err => { if (err.response.status == 401) return router.push('/login') }
)
export default axios 