import { QuestionsRepository } from "../repositories/questions-repository";
import { Question } from "../../enterprise/entities/question";
import { CreateQuestionService } from "./create-question";

const fakeQuestionRepository: QuestionsRepository = {
  create: async function (question: Question) {
    return;
  },
};

test("create a question", async () => {
  const createQuestion = new CreateQuestionService(fakeQuestionRepository);

  const { question } = await createQuestion.execute({
    authorId: "1",
    title: "Nova pergunta",
    content: "Conteúdo da pergunta",
  });

  expect(question.id).toBeTruthy();
});
