import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface FetchQuestionCommentsServiceRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionCommentsServiceResponse {
  questionComments: QuestionComment[];
}

export class FetchQuestionCommentsService {
  constructor(private questionCommentsRepo: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsServiceRequest): Promise<FetchQuestionCommentsServiceResponse> {
    const questionComments =
      await this.questionCommentsRepo.findManyByQuestionId(questionId, {
        page,
      });

    return {
      questionComments,
    };
  }
}
