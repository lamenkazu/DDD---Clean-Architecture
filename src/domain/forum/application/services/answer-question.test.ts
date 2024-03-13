import { AnswerQuestionService } from "./answer-question";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";

let inMemoryAnswersRepo: InMemoryAnswersRepository;
let sut: AnswerQuestionService;

describe("Answer Question", () => {
  beforeEach(() => {
    inMemoryAnswersRepo = new InMemoryAnswersRepository();
    sut = new AnswerQuestionService(inMemoryAnswersRepo);
  });

  it.only("should be able to create an answer", async () => {
    const result = await sut.execute({
      content: "Nova resposta",
      instructorId: "1",
      questionId: "1",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepo.items[0]).toEqual(result.value?.answer);
  });
});
