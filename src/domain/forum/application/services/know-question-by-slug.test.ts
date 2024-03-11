import { CreateQuestionService } from "./create-question";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { KnowQuestionBySlugService } from "./know-question-by-slug";
import { Question } from "../../enterprise/entities/question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepo: InMemoryQuestionRepository;
let sut: KnowQuestionBySlugService;

describe("Know Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepo = new InMemoryQuestionRepository();
    sut = new KnowQuestionBySlugService(inMemoryQuestionsRepo);
  });

  it("should be able to know a question by slug", async () => {
    const testQuestion = Question.create({
      authorId: new UniqueEntityId(),
      content: "fakecontent",
      title: "example question",
    });

    await inMemoryQuestionsRepo.create(testQuestion);

    const { question } = await sut.execute({
      slug: "example-question",
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepo.items[0].title).toEqual(testQuestion.title);
  });
});
