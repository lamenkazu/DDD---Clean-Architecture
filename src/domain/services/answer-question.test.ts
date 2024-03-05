import { expect, test } from "vitest";
import { AnswerQuestionService } from "./answer-question";
import { AnswerRepository } from "../repositories/answers-repository";
import { Answer } from "../entities/answer";

const fakeAnswerRepository: AnswerRepository = {
  create: async function (answer: Answer) {
    return;
  },
};

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionService(fakeAnswerRepository);

  const answer = await answerQuestion.execute({
    content: "Nova resposta",
    instructorId: "1",
    questionId: "1",
  });

  expect(answer.content).toEqual("Nova resposta");
});
