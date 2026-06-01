import { jwtDecode } from "jwt-decode";

export const isLogin = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (error) {
    localStorage.removeItem("token");
    return false;
  }
};