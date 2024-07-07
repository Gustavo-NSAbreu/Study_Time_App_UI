import { AxiosInstance } from "axios";
import client from "../../axios/axios.client";
import { User } from "../../../entity/user.entity";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}


export class UserService {
  constructor(private readonly httpClient: AxiosInstance = client) {}
  
  async createUser(user: CreateUserDto) {
    try {
      return await this.httpClient.post<User>('/user', user);
    } catch (error) {
      console.log(error);
    }
  }

  async login(user: LoginDto) {
    try {
      const response = await this.httpClient.post<User>('/user/login', user);
      console.log(response.data.id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async findUser(userId: number) {
    return this.httpClient.get<User>(`/user/${userId}`);
  }

  async updateUser(user: CreateUserDto) {
    return this.httpClient.post<User>('/user', user);
  }
  
  async deleteUser(userId: number) {
    return this.httpClient.delete(`/user/${userId}`);
  }
}