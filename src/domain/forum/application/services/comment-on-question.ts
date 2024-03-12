import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface CommentOnQuestionServiceRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionServiceResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionService {
  constructor(
    private questionRepo: QuestionsRepository,
    private questionCommentRepo: QuestionCommentsRepository
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionServiceRequest): Promise<CommentOnQuestionServiceResponse> {
    const question = await this.questionRepo.findById(questionId);

    if (!question) throw new Error("Question not found.");

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionCommentRepo.create(questionComment);

    return {
      questionComment,
    };
  }
}
