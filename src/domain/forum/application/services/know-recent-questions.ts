import { QuestionsRepository } from "../repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";

interface KnowRecentQuestionsServiceRequest {
  page: number;
}

interface KnowRecentQuestionsServiceResponse {
  questions: Question[];
}

export class KnowRecentQuestionsService {
  constructor(private questionRepo: QuestionsRepository) {}

  async execute({
    page,
  }: KnowRecentQuestionsServiceRequest): Promise<KnowRecentQuestionsServiceResponse> {
    const questions = await this.questionRepo.findManyRecent({ page });

    return {
      questions,
    };
  }
}
