import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { DeleteAnswerService } from "./delete-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

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

    await inMemoryAnswersRepo.create(testAnswer);

    const result = await sut.execute({
      authorId: testOtherId,
      answerId: testAnswerId,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
