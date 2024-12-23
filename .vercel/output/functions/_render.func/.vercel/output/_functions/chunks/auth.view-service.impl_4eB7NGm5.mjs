import { s as setUiError } from './ui.store_QvZKQ_iI.mjs';

class Validators {
  static get email() {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  }
}

class RegisterUserDto {
  constructor(name, lastName, email, password) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
  static create(object) {
    const { name, lastName, email, password } = object;
    if (!name) return ["missing name", void 0];
    if (!lastName) return ["missing last name", void 0];
    if (!email) return ["missing email", void 0];
    if (!Validators.email.test(email)) return ["email is not valid"];
    if (!password) return ["missing password", void 0];
    if (password.length < 6) return ["password too short", void 0];
    return [
      void 0,
      new RegisterUserDto(name, lastName, email, password)
    ];
  }
}

class LoginUserDto {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  static create(object) {
    const { email, password } = object;
    if (!email) return ["missing email", void 0];
    if (!Validators.email.test(email)) return ["email is not valid"];
    if (!password) return ["missing password", void 0];
    if (password.length < 6) return ["password too short", void 0];
    return [void 0, new LoginUserDto(email, password)];
  }
}

class UpdateUserDto {
  constructor(name, lastName, email) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
  }
  static create(object) {
    const { name, lastName, email } = object;
    return [
      void 0,
      new UpdateUserDto(name, lastName, email)
    ];
  }
}

class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
  static badRequest(message) {
    return new CustomError(400, message);
  }
  static unauthorized(message) {
    return new CustomError(401, message);
  }
  static forbidden(message) {
    return new CustomError(403, message);
  }
  static notFound(message) {
    return new CustomError(404, message);
  }
  static internalServer(message = "internal server error") {
    return new CustomError(500, message);
  }
}

class Login {
  constructor(authService) {
    this.authService = authService;
  }
  async execute(loginUserDto) {
    const user = await this.authService.login(loginUserDto);
    return user;
  }
}

class Register {
  constructor(authService) {
    this.authService = authService;
  }
  async execute(registerUserDto) {
    const user = await this.authService.register(registerUserDto);
    return user;
  }
}

class CheckToken {
  constructor(authService) {
    this.authService = authService;
  }
  async execute(token) {
    const user = await this.authService.checkToken(token);
    return user;
  }
}

class Logout {
  constructor(authService) {
    this.authService = authService;
  }
  async execute() {
    await this.authService.logout();
  }
}

class UpdateUser {
  constructor(authService) {
    this.authService = authService;
  }
  async execute(updateUserDto) {
    const user = await this.authService.update(updateUserDto);
    return user;
  }
}

class AuthGithub {
  constructor(authService) {
    this.authService = authService;
  }
  async execute() {
    await this.authService.authGithub();
  }
}

class DeleteAccount {
  constructor(authService) {
    this.authService = authService;
  }
  async execute() {
    await this.authService.deleteAccount();
  }
}

class ForgotPassword {
  constructor(authService) {
    this.authService = authService;
  }
  async execute(email) {
    await this.authService.forgotPassword(email);
  }
}

class CheckPasswordToken {
  constructor(authService) {
    this.authService = authService;
  }
  async execute(token) {
    return await this.authService.checkPasswordToken(token);
  }
}

class UpdatePassword {
  constructor(authService) {
    this.authService = authService;
  }
  async execute(token, password) {
    return await this.authService.updatePassword(token, password);
  }
}

const API_BASE_URL = "http://localhost:3000/api/v1";
class HttpClient {
  static accessToken = "";
  static baseURL = API_BASE_URL;
  static async request(url, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      "Cookie": "",
      ...options.headers
    };
    if (this.accessToken) {
      headers.Cookie = `access_token=${this.accessToken}`;
    }
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      credentials: "include",
      headers
    });
    if (!response.ok) {
      const error = await response.json();
      throw new CustomError(response.status, error.error || error.message);
    }
    return response.json();
  }
  static async get(url, options = {}) {
    return this.request(url, { ...options, method: "GET" });
  }
  static async post(url, body, options = {}) {
    return this.request(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body)
    });
  }
  static async put(url, body, options = {}) {
    return this.request(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body)
    });
  }
  static async delete(url, options = {}) {
    return this.request(url, { ...options, method: "DELETE" });
  }
}

class AuthServiceImpl {
  login(loginUserDto) {
    return HttpClient.post("/auth/login", loginUserDto);
  }
  register(registerUserDto) {
    return HttpClient.post("/auth/register", registerUserDto);
  }
  checkToken(token) {
    if (token) {
      return HttpClient.get("/auth/token", { headers: {
        Cookie: `access_token=${token}`
      } });
    } else {
      return HttpClient.get("/auth/token");
    }
  }
  logout() {
    HttpClient.accessToken = "";
    return HttpClient.get("/auth/logout");
  }
  update(updateUserDto) {
    return HttpClient.put("/auth", updateUserDto);
  }
  authGithub() {
    return HttpClient.get("/auth/github");
  }
  deleteAccount() {
    return HttpClient.delete("/auth");
  }
  forgotPassword(email) {
    return HttpClient.post("/auth/forgot-password", { email });
  }
  checkPasswordToken(token) {
    return HttpClient.get(`/auth/password-token/${token}`);
  }
  updatePassword(token, password) {
    return HttpClient.put("/auth/update-password", { token, password });
  }
}

class AuthViewServiceImpl {
  constructor(authService, notifyUiError = setUiError) {
    this.authService = authService;
    this.notifyUiError = notifyUiError;
  }
  handleError = (error) => {
    if (error instanceof CustomError) {
      this.notifyUiError({ type: "error", message: error.message });
      return;
    }
    this.notifyUiError({
      type: "error",
      message: "Please try again later. If the issue persists talk to the admin."
    });
  };
  async loginByEmail(email, password) {
    const [error, loginUserDto] = LoginUserDto.create({ email, password });
    if (error) {
      return;
    }
    return new Login(this.authService).execute(loginUserDto).then(() => {
      window.location.href = "/dashboard";
    }).catch((error2) => this.handleError(error2));
  }
  async registerByEmail(email, name, lastName, password) {
    const [error, registerUserDto] = RegisterUserDto.create({
      name,
      lastName,
      email,
      password
    });
    if (error) {
      return;
    }
    new Register(this.authService).execute(registerUserDto).then(() => {
      window.location.href = "/dashboard";
    }).catch((error2) => this.handleError(error2));
  }
  async checkToken(token) {
    return new CheckToken(this.authService).execute(token).then((data) => data).catch((error) => {
      if (!(error instanceof CustomError)) {
        this.notifyUiError({
          type: "error",
          message: "An unexpected error has happened. If the issue persists please talk to the admin."
        });
      }
    });
  }
  async logout() {
    return new Logout(this.authService).execute().then(() => {
      window.location.href = "/";
    }).catch(this.handleError);
  }
  async update(name, lastName, email) {
    const [error, updateUserDto] = UpdateUserDto.create({
      name,
      lastName,
      email
    });
    if (error) {
      this.notifyUiError({ type: "error", message: error });
      return;
    }
    return new UpdateUser(this.authService).execute(updateUserDto).then((data) => data).catch(this.handleError);
  }
  async authGithub() {
    new AuthGithub(this.authService).execute();
  }
  async deleteAccount() {
    new DeleteAccount(this.authService).execute().then(() => {
      window.location.href = "/";
    }).catch(this.handleError);
  }
  async forgotPassword(email) {
    new ForgotPassword(this.authService).execute(email).then(() => {
      window.location.href = `/auth/forgot-password/confirm?email=${encodeURIComponent(email)}`;
    }).catch((error) => {
      if (error.statusCode !== 500) {
        window.location.href = `/auth/forgot-password/confirm?email=${encodeURIComponent(email)}`;
        return;
      }
      if (error instanceof CustomError) {
        this.notifyUiError({ type: "error", message: error.message });
        return;
      }
      this.notifyUiError({
        type: "error",
        message: "Please try again later. If the issue persists talk to the admin."
      });
    });
  }
  async checkPasswordToken(token) {
    return new CheckPasswordToken(this.authService).execute(token).then((data) => data).catch(this.handleError);
  }
  async updatePassword(token, password) {
    return new UpdatePassword(this.authService).execute(token, password).then((data) => data).catch(this.handleError);
  }
}

export { AuthViewServiceImpl as A, CustomError as C, HttpClient as H, AuthServiceImpl as a };
