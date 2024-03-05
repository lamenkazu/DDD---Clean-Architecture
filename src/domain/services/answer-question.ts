import { Answer } from "../entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";

interface AnswerQuestionServiceRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionService {
  constructor(private answerRepo: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionServiceRequest) {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId,
    });

    await this.answerRepo.create(answer);

    return answer;
  }
}
