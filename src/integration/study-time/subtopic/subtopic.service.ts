import { AxiosInstance } from "axios";
import client from "../../axios/axios.client";
import { Subtopic } from "../../../entity/subtopic.entity";

export interface CreateSubtopicDto {
  title: string;
  topicId: number;
}

export class SubtopicService {
  constructor(private readonly httpClient: AxiosInstance = client) {}
  
  async createSubtopic(subtopic: CreateSubtopicDto) {
    return await this.httpClient.post<Subtopic>('/subtopic', subtopic);
  }

  async findAllSubtopics(topicId: number) {
    return await this.httpClient.get<Subtopic[]>(`/subtopic/${topicId}`);
  }

  async updateSubtopic(subtopic: CreateSubtopicDto) {
    return await this.httpClient.post<Subtopic>('/subtopic', subtopic);
  }
  
  async deleteSubtopic(subtopicId: number) {
    return await this.httpClient.delete(`/subtopic/${subtopicId}`);
  }
}