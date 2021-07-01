import axios from "axios"

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl
    this.token = null
    this.tokenName = "life_tracker_token"
  }

  setToken(token) {
    this.token = token
    localStorage.setItem(this.tokenName, token)
  }

  async request({ endpoint, method = `GET`, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`

    const headers = {
      "Content-Type": "application/json",
      Authorization: this.token ? `Bearer ${this.token}` : "",
    }

    try {
      const res = await axios({ url, method, data, headers })
      return { data: res.data, error: null }
    } catch (error) {
      console.error("APIclient.makeRequest.error:")
      console.error({ errorResponse: error.response })
      const message = error?.response?.data?.error?.message
      return { data: null, error: message || String(error) }
    }
  }

  async fetchExercises() {
    return await this.request({ endpoint: `activity/exercises`})
  }

  async fetchTotalExerciseTime() {
    return await this.request({ endpoint: `activity/exercises/total`})
  }

  async createExercise(newExercise) {
    return await this.request({ endpoint: `activity/exercise`, method: `POST`, data: {exercise: newExercise}})
  }

  async fetchNutritions() {
    return await this.request({ endpoint: `activity/nutritions`})
  }

  async fetchAvgCalories() {
    return await this.request({ endpoint: `activity/nutritions/avg`})
  }

  async createNutrition(newNutrition) {
    return await this.request({ endpoint: `activity/nutrition`, method: `POST`, data: {nutrition: newNutrition}})
  }

  async fetchSleeps() {
    return await this.request({ endpoint: `activity/sleeps`})
  }

  async fetchAvgSleepTime() {
    return await this.request({ endpoint: `activity/sleeps/avg`})
  }

  async createSleep(newSleep) {
    return await this.request({ endpoint: `activity/sleep`, method: `POST`, data: {sleep: newSleep}})
  }

  async fetchUserFromToken() {
    return await this.request({ endpoint: `auth/me`})
  }

  async signupUser(credentials) {
    return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials })
  }

  async loginUser(credentials) {
    return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials })
  }

  async logoutUser() {
    this.setToken(null)
    localStorage.setItem(this.tokenName, "")
  }
}

const API = new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001")

export default API