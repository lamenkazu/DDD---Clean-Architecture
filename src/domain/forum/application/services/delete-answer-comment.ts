import { Either, left, right } from "@/core/either";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentServiceRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentServiceResponse = Either<string, {}>;

export class DeleteAnswerCommentService {
  constructor(private answerCommentRepo: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentServiceRequest): Promise<DeleteAnswerCommentServiceResponse> {
    const answerComment = await this.answerCommentRepo.findById(
      answerCommentId
    );

    if (!answerComment) return left('"Answer not found."');

    if (answerComment.authorId.toString() !== authorId)
      return left("Not allowed.");

    await this.answerCommentRepo.delete(answerComment);

    return right({});
  }
}
