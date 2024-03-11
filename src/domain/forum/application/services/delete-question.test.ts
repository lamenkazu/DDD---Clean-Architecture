import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { DeleteQuestionService } from "./delete-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepo: InMemoryQuestionRepository;
let sut: DeleteQuestionService;

describe("Delete Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepo = new InMemoryQuestionRepository();
    sut = new DeleteQuestionService(inMemoryQuestionsRepo);
  });

  it("should be able to delete a question by id", async () => {
    const testQuestionId = "question-id-1";
    const testAuthorId = "author-id-1";

    const testQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId(testAuthorId),
      },
      new UniqueEntityId(testQuestionId)
    );

    console.log(testQuestion);

    await inMemoryQuestionsRepo.create(testQuestion);

    await sut.execute({
      authorId: testAuthorId,
      questionId: testQuestionId,
    });

    expect(inMemoryQuestionsRepo.items).toHaveLength(0);
  });

  it("should not be able to delete a question from another user", async () => {
    const testQuestionId = "question-id-1";
    const testAuthorId = "author-id-1";
    const testOtherId = "author-id-2";

    const testQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId(testAuthorId),
      },
      new UniqueEntityId(testQuestionId)
    );

    console.log(testQuestion);

    await inMemoryQuestionsRepo.create(testQuestion);

    await expect(() =>
      sut.execute({
        authorId: testOtherId,
        questionId: testQuestionId,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
