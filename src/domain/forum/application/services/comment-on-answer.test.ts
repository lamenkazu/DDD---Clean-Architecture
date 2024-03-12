//Factories
import { makeAnswer } from "test/factories/make-answer";

import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { CommentOnAnswerService } from "./comment-on-answer";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";

let inMemoryAnswersRepo: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepo: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerService;

describe("Comment on Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepo = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepo = new InMemoryAnswerCommentsRepository();

    sut = new CommentOnAnswerService(
      inMemoryAnswersRepo,
      inMemoryAnswerCommentsRepo
    );
  });

  it("should be able to comment on answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepo.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "Comentário de teste",
    });

    expect(inMemoryAnswerCommentsRepo.items[0].content).toEqual(
      "Comentário de teste"
    );
  });
});
