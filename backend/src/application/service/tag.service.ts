import { Tag } from "../../domain/entities/tag.entity";
import { TagRepository } from "../../domain/repositories/tag.repository";

export class TagService {
  constructor(private readonly TagRepository: TagRepository) {}

  async getAllTags(): Promise<Tag[]> {
    return this.TagRepository.getAllTags();
  }

  async getTagById(id: number): Promise<Tag | null> {
    return this.TagRepository.getTagById(id);
  }

  async createTag(data: { tagName: string }): Promise<Tag | null> {
    const all = await this.getAllTags();
    const exists = all.find(t => t.tagName === data.tagName);
    if (exists) return null;

    return this.TagRepository.createTag(data.tagName);
  }

  async editTag(id: number, data: { tagName: string }): Promise<Tag | null> {
    return this.TagRepository.editTag(id, data.tagName)
  }

  async removeTagById(id: number): Promise<Tag | null> {
    return this.TagRepository.removeTagById(id);
  }
}
