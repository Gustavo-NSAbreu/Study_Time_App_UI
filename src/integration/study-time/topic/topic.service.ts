import { AxiosInstance } from "axios";
import client from "../../axios/axios.client";
import { Topic } from "../../../entity/topic.entity";

export interface CreateTopicDto {
  title: string;
  userId: number;
}

export class TopicService {
  constructor(private readonly httpClient: AxiosInstance = client) {}
  
  async createTopic(topic: CreateTopicDto) {
    console.log(topic);
    return this.httpClient.post<Topic>('/topic', topic);
  }

  async findAllTopics(userId: number) {
    console.log(userId);
    return this.httpClient.get<Topic[]>(`/topic/${userId}`);
  }

  // async findTopic(topicId: number) {
  //   return this.httpClient.get(`/topic/${topicId}`);
  // }

  async updateTopic(topic: CreateTopicDto) {
    return this.httpClient.post<Topic>('/topic', topic);
  }
  
  async deleteTopic(topicId: number) {
    return this.httpClient.delete(`/topic/${topicId}`);
  }
}