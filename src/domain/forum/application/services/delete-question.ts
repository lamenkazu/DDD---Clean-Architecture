import { QuestionsRepository } from "../repositories/questions-repository";

interface DeleteQuestionServiceRequest {
  authorId: string;
  questionId: string;
}

interface DeleteQuestionServiceResponse {}

export class DeleteQuestionService {
  constructor(private questionRepo: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionServiceRequest): Promise<DeleteQuestionServiceResponse> {
    const question = await this.questionRepo.findById(questionId);

    if (!question) throw new Error("Question not found.");

    if (authorId !== question.authorId.toString())
      throw new Error("Not allowed");

    await this.questionRepo.delete(question);

    return {};
  }
}
