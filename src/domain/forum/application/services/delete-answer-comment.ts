import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentServiceRequest {
  authorId: string;
  answerCommentId: string;
}

interface DeleteAnswerCommentServiceResponse {}

export class DeleteAnswerCommentService {
  constructor(private answerCommentRepo: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentServiceRequest): Promise<DeleteAnswerCommentServiceResponse> {
    const answerComment = await this.answerCommentRepo.findById(
      answerCommentId
    );

    if (!answerComment) throw new Error("Answer not found.");

    if (answerComment.authorId.toString() !== authorId)
      throw new Error("Not allowed.");

    await this.answerCommentRepo.delete(answerComment);

    return {};
  }
}
