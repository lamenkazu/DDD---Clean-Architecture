import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentServiceRequest {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionCommentServiceResponse {}

export class DeleteQuestionCommentService {
  constructor(private questionCommentRepo: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentServiceRequest): Promise<DeleteQuestionCommentServiceResponse> {
    const questionComment = await this.questionCommentRepo.findById(
      questionCommentId
    );

    if (!questionComment) throw new Error("Question not found.");

    if (questionComment.authorId.toString() !== authorId)
      throw new Error("Not allowed.");

    await this.questionCommentRepo.delete(questionComment);

    return {};
  }
}
