import { UniqueEntityId } from "../../core/entities/unique-entity-id";
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
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    });

    await this.answerRepo.create(answer);

    return answer;
  }
}
