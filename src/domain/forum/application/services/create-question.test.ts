import { CreateQuestionService } from "./create-question";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";

let inMemoryQuestionsRepo: InMemoryQuestionRepository;
let sut: CreateQuestionService;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepo = new InMemoryQuestionRepository();
    sut = new CreateQuestionService(inMemoryQuestionsRepo);
  });

  it("should be able to create a question", async () => {
    const { question } = await sut.execute({
      authorId: "1",
      title: "Nova pergunta",
      content: "Conteúdo da pergunta",
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepo.items[0].id).toEqual(question.id);
  });
});