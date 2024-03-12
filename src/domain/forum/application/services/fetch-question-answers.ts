import { AnswerRepository } from "../repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";

interface FetchQuestionAnswersServiceRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionAnswersServiceResponse {
  answers: Answer[];
}

export class FetchQuestionAnswersService {
  constructor(private answerRepo: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersServiceRequest): Promise<FetchQuestionAnswersServiceResponse> {
    const answers = await this.answerRepo.findManyByQuestionId(questionId, {
      page,
    });

    return {
      answers,
    };
  }
}
