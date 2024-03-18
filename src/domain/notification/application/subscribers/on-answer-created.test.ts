import { makeAnswer } from "test/factories/make-answer";
import { OnAnswerCreated } from "./on-answer-created";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";

let inMemoryAttachsRepo: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepo: InMemoryAnswersRepository;

describe("On Answer Created", () => {
  beforeEach(() => {
    inMemoryAttachsRepo = new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepo = new InMemoryAnswersRepository(inMemoryAttachsRepo);
  });

  it("should send a notification when an answer is created", () => {
    const onAnswerCreated = new OnAnswerCreated();

    const answer = makeAnswer();

    inMemoryAnswersRepo.create(answer);
  });
});
