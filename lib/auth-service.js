import http from './http'

const authService = {
  async login(credentials) {
    try {
      const response = await http.post('/login', credentials)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  async logout() {
    try {
      await http.post('/logout')
    } catch (error) {
      console.error('Logout error:', error)
    }
  },

  async getUser() {
    try {
      const response = await http.get('/user')
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },
}

export default authService