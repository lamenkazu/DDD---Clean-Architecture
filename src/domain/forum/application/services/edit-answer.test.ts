import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { EditAnswerService } from "./edit-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryAnswersRepo: InMemoryAnswersRepository;
let sut: EditAnswerService;

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepo = new InMemoryAnswersRepository();
    sut = new EditAnswerService(inMemoryAnswersRepo);
  });

  it("should be able to edit a answer by id", async () => {
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
      answerId: testAnswer.id.toValue(),
      content: "Conteúdo teste",
    });

    expect(inMemoryAnswersRepo.items[0]).toMatchObject({
      content: "Conteúdo teste",
    });
  });

  it("should not be able to edit a answer from another user", async () => {
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

    const result = await sut.execute({
      authorId: testOtherId,
      answerId: testAnswer.id.toValue(),
      content: "Conteúdo teste",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
