import { AxiosInstance } from "axios";
import client from "../../axios/axios.client";
import { Topic } from "../../../entity/topic.entity";

export interface CreateTopicDto {
  title: string;
  userId: number;
  lastDateStudy: Date;
}

export interface UpdateTopicDto {
  id: number;
  title: string;
  userId: number;
  lastDateStudy: Date;
  time?: number;
}

export class TopicService {
  constructor(private readonly httpClient: AxiosInstance = client) {}
  
  async createTopic(topic: CreateTopicDto) {
    return this.httpClient.post<Topic>('/topic', topic);
  }

  async findAllTopics(userId: number) {
    return this.httpClient.get<Topic[]>(`/topic/${userId}`);
  }
  
  async updateTopic(topic: UpdateTopicDto) {
    return this.httpClient.put<Topic>('/topic', topic);
  }
  
  async deleteTopic(topicId: number) {
    return this.httpClient.delete(`/topic/${topicId}`);
  }
}