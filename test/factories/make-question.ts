import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/question";

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  return Question.create({
    authorId: new UniqueEntityId(),
    title: "example question",
    content: "fakecontent",
    ...override,
  });
}
