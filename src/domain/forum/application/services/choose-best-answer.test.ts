//Factories
import { makeAnswer } from "test/factories/make-answer";
import { makeQuestion } from "test/factories/make-question";

import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { ChooseBestAnswerService } from "./choose-best-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepo: InMemoryQuestionRepository;
let inMemoryAnswersRepo: InMemoryAnswersRepository;
let sut: ChooseBestAnswerService;

describe("Choose Best Answer", () => {
  beforeEach(() => {
    inMemoryQuestionsRepo = new InMemoryQuestionRepository();
    inMemoryAnswersRepo = new InMemoryAnswersRepository();

    sut = new ChooseBestAnswerService(
      inMemoryQuestionsRepo,
      inMemoryAnswersRepo
    );
  });

  it("should be able to choose the question best answer", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepo.create(question);
    await inMemoryAnswersRepo.create(answer);

    await sut.execute({
      questionAuthorId: question.authorId.toString(),
      answerId: answer.id.toString(),
    });

    expect(inMemoryQuestionsRepo.items[0].bestAnswerId).toEqual(answer.id);
  });

  it("should not be able to choose another user question best answer", async () => {
    const testAuthorId = "author-id-1";
    const testOtherId = "author-id-2";

    const question = makeQuestion({
      authorId: new UniqueEntityId(testAuthorId),
    });
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepo.create(question);
    await inMemoryAnswersRepo.create(answer);

    await expect(() =>
      sut.execute({
        questionAuthorId: testOtherId,
        answerId: answer.id.toString(),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
