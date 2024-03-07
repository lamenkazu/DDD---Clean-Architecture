import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface QuestionProps {
  title: string;
  slug: Slug;
  content: string;
  authorId: UniqueEntityId;
}

export class Question extends Entity<QuestionProps> {}
