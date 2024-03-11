import { AnswerRepository } from "../repositories/answers-repository";

interface DeleteAnswerServiceRequest {
  authorId: string;
  answerId: string;
}

interface DeleteAnswerServiceResponse {}

export class DeleteAnswerService {
  constructor(private answerRepo: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerServiceRequest): Promise<DeleteAnswerServiceResponse> {
    const answer = await this.answerRepo.findById(answerId);

    if (!answer) throw new Error("Answer not found.");

    if (authorId !== answer.authorId.toString()) throw new Error("Not allowed");

    await this.answerRepo.delete(answer);

    return {};
  }
}
