import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { KnowRecentQuestionsService } from "./know-recent-questions";

let inMemoryQuestionsRepo: InMemoryQuestionRepository;
let sut: KnowRecentQuestionsService;

describe("Know Recent Questions", () => {
  beforeEach(() => {
    inMemoryQuestionsRepo = new InMemoryQuestionRepository();
    sut = new KnowRecentQuestionsService(inMemoryQuestionsRepo);
  });

  it("should be able to fetch recent questions", async () => {
    await inMemoryQuestionsRepo.create(
      makeQuestion({ createdAt: new Date(2024, 0, 20) })
    );

    await inMemoryQuestionsRepo.create(
      makeQuestion({ createdAt: new Date(2024, 0, 18) })
    );

    await inMemoryQuestionsRepo.create(
      makeQuestion({ createdAt: new Date(2024, 0, 23) })
    );

    const { questions } = await sut.execute({ page: 1 });

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 18) }),
    ]);
  });

  it("should be able to fetch recent paginted questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepo.create(makeQuestion());
    }

    const { questions } = await sut.execute({ page: 2 });

    expect(questions).toHaveLength(2);
  });
});
