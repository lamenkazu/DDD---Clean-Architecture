import { QuestionsRepository } from "../repositories/questions-repository";

interface EditQuestionServiceRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

interface EditQuestionServiceResponse {}

export class EditQuestionService {
  constructor(private questionRepo: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionServiceRequest): Promise<EditQuestionServiceResponse> {
    const question = await this.questionRepo.findById(questionId);

    if (!question) throw new Error("Question not found.");

    if (authorId !== question.authorId.toString())
      throw new Error("Not allowed");

    question.title = title;
    question.content = content;

    await this.questionRepo.update(question);

    return {};
  }
}
