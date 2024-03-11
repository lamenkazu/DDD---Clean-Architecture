import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { DeleteAnswerService } from "./delete-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepo: InMemoryAnswersRepository;
let sut: DeleteAnswerService;

describe("Delete Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepo = new InMemoryAnswersRepository();
    sut = new DeleteAnswerService(inMemoryAnswersRepo);
  });

  it("should be able to delete a answer by id", async () => {
    const testAnswerId = "answer-id-1";
    const testAuthorId = "author-id-1";

    const testAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId(testAuthorId),
      },
      new UniqueEntityId(testAnswerId)
    );

    console.log(testAnswer);

    await inMemoryAnswersRepo.create(testAnswer);

    await sut.execute({
      authorId: testAuthorId,
      answerId: testAnswerId,
    });

    expect(inMemoryAnswersRepo.items).toHaveLength(0);
  });

  it("should not be able to delete a answer from another user", async () => {
    const testAnswerId = "answer-id-1";
    const testAuthorId = "author-id-1";
    const testOtherId = "author-id-2";

    const testAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId(testAuthorId),
      },
      new UniqueEntityId(testAnswerId)
    );

    console.log(testAnswer);

    await inMemoryAnswersRepo.create(testAnswer);

    await expect(() =>
      sut.execute({
        authorId: testOtherId,
        answerId: testAnswerId,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
