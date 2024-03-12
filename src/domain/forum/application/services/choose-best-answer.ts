import { AnswerRepository } from "../repositories/answers-repository";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ChooseBestAnswerServiceRequest {
  questionAuthorId: string;
  answerId: string;
}

interface ChooseBestAnswerServiceResponse {
  question: Question;
}

export class ChooseBestAnswerService {
  constructor(
    private questionRepo: QuestionsRepository,
    private answerRepo: AnswerRepository
  ) {}

  async execute({
    questionAuthorId,
    answerId,
  }: ChooseBestAnswerServiceRequest): Promise<ChooseBestAnswerServiceResponse> {
    const answer = await this.answerRepo.findById(answerId);
    if (!answer) throw new Error("Answer not found.");

    const question = await this.questionRepo.findById(
      answer.questionId.toString()
    );
    if (!question) throw new Error("Question not found.");

    if (questionAuthorId !== question.authorId.toString())
      throw new Error("Not Allowed");

    question.bestAnswerId = answer.id;

    await this.questionRepo.update(question);

    return {
      question,
    };
  }
}
