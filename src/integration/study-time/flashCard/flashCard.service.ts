import { AxiosInstance } from "axios";
import client from "../../axios/axios.client";
import { FlashCard } from "../../../entity/flashCard.entity";

export interface CreateFlashCardDto {
  question: string;
  answer: string;  
  subtopicId: number;
}

export class FlashCardService {
  constructor(private readonly httpClient: AxiosInstance = client) {}
  
  async createFlashCard(flashCard: CreateFlashCardDto) {
    return this.httpClient.post<FlashCard>('/flashCard', flashCard);
  }

  async findAllFlashCard(subtopicId: number) {
    return this.httpClient.get<FlashCard[]>(`/flashCard/${subtopicId}`);
  }

  // async findFlashCard(flashCardId: number) {
  //   return this.httpClient.get(`/flashCard/${flashCardId}`);
  // }

  async updateFlashCard(flashCard: CreateFlashCardDto) {
    return this.httpClient.post<FlashCard>('/flashCard', flashCard);
  }
  
  async deleteFlashCard(flashCardId: number) {
    return this.httpClient.delete(`/flashCard/${flashCardId}`);
  }
}