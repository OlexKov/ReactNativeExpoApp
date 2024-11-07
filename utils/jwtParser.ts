import { IUser } from "@/models/account";
import { jwtDecode } from "jwt-decode";
export const jwtParse = (token: string): IUser | null => {
  try {
    const data = jwtDecode<any>(token);
    return {
      id: data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
      firstName: data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      lastName: data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'],
      email: data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      exp: data['exp'],
      photo: data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/anonymous'],
      roles: data['roles'] || []
    }
  }
  catch (error) {
    console.log("Помилка при парсингу токена:", error);
    return null;
  }
}