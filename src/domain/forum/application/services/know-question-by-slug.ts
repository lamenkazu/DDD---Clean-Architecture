import { QuestionsRepository } from "../repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";

interface KnowQuestionBySlugServiceRequest {
  slug: string;
}

interface KnowQuestionBySlugServiceResponse {
  question: Question;
}

export class KnowQuestionBySlugService {
  constructor(private questionRepo: QuestionsRepository) {}

  async execute({
    slug,
  }: KnowQuestionBySlugServiceRequest): Promise<KnowQuestionBySlugServiceResponse> {
    const question = await this.questionRepo.findBySlug(slug);

    if (!question) {
      throw new Error("Question not found.");
    }

    return {
      question,
    };
  }
}
