import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface EditAnswerServiceRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type EditAnswerServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerService {
  constructor(private answerRepo: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerServiceRequest): Promise<EditAnswerServiceResponse> {
    const answer = await this.answerRepo.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError());

    if (authorId !== answer.authorId.toString())
      return left(new NotAllowedError());

    answer.content = content;

    await this.answerRepo.update(answer);

    return right({
      answer,
    });
  }
}
