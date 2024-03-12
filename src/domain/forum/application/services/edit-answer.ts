import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";

interface EditAnswerServiceRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface EditAnswerServiceResponse {
  answer: Answer;
}

export class EditAnswerService {
  constructor(private answerRepo: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerServiceRequest): Promise<EditAnswerServiceResponse> {
    const answer = await this.answerRepo.findById(answerId);

    if (!answer) throw new Error("Answer not found.");

    if (authorId !== answer.authorId.toString()) throw new Error("Not allowed");

    answer.content = content;

    await this.answerRepo.update(answer);

    return {
      answer,
    };
  }
}
