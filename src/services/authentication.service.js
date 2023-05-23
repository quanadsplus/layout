
// import axios from "axios";
import {
  // AUTHENTICATION_LOGIN, LOGIN_URL,
} from "../configs/api";
import fakeBackEnd from "../helpers/fake-backend";
class AuthenticationService {
  /**
   * Login with phone and password
   */
  static async login(email, password,isSaveLogin) {
    try {
      const result = await fakeBackEnd.getLogin('https://api-node.themesbrand.website/auth/signin',{email,password,isSaveLogin})
      return result;
    } catch (error) {
      throw new Error(error)
    }
  }

  
}

export default AuthenticationService;
