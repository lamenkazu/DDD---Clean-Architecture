import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { EditQuestionService } from "./edit-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepo: InMemoryQuestionRepository;
let sut: EditQuestionService;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepo = new InMemoryQuestionRepository();
    sut = new EditQuestionService(inMemoryQuestionsRepo);
  });

  it("should be able to edit a question by id", async () => {
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
      questionId: testQuestion.id.toValue(),
      title: "Pergunta teste",
      content: "Conteúdo teste",
    });

    expect(inMemoryQuestionsRepo.items[0]).toMatchObject({
      title: "Pergunta teste",
      content: "Conteúdo teste",
    });
  });

  it("should not be able to edit a question from another user", async () => {
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
        questionId: testQuestion.id.toValue(),
        title: "Pergunta teste",
        content: "Conteúdo teste",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
