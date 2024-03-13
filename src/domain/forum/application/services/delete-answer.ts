import { Either, left, right } from "@/core/either";
import { AnswerRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteAnswerServiceRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerServiceResponse = Either<ResourceNotFoundError, {}>;

export class DeleteAnswerService {
  constructor(private answerRepo: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerServiceRequest): Promise<DeleteAnswerServiceResponse> {
    const answer = await this.answerRepo.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError());

    if (authorId !== answer.authorId.toString()) throw new Error("Not allowed");

    await this.answerRepo.delete(answer);

    return right({});
  }
}
