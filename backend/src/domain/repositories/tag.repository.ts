import { Tag } from "../entities/tag.entity";

export interface TagRepository {
  getAllTags(): Promise<Tag[]>;
  getTagById(id: number): Promise<Tag | null>;
  createTag(tagName: string): Promise<Tag | null>;
  editTag(id: number,tagName: string): Promise<Tag | null>;
  removeTagById(id: number): Promise<Tag | null>;
}
