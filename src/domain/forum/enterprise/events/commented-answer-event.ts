import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";
import { AnswerComment } from "../entities/answer-comment";

export class CommentedAnswerEvent implements DomainEvent {
  public ocurredAt: Date;
  public answerComment: AnswerComment;

  constructor(answerComment: AnswerComment) {
    this.answerComment = answerComment;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityId {
    return this.answerComment.id;
  }
}
