import api from "../api/api";

class AuthService {
  async register(name, email, password) {
    console.log("Sending register:", { name, email, password });

    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    console.log("REGISTER RESPONSE:", data);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  }

  async login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  }
}

export default new AuthService();
