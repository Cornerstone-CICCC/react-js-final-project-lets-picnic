import { SecondaryImage } from "../../domain/entities/secondaryImage.entity";
import { SecondaryImageRepository } from "../../domain/repositories/secondaryImage.repository";

export class SecondaryImageService {
  constructor(private readonly secondaryImageRepository: SecondaryImageRepository) {}

  async getAllSecondaryImages(): Promise<SecondaryImage[]> {
    return this.secondaryImageRepository.getAllSecondaryImages();
  }

  async getSecondaryImageById(id: number): Promise<SecondaryImage | null> {
    return this.secondaryImageRepository.getSecondaryImageById(id);
  }

  async createSecondaryImage(data: { image: string }): Promise<SecondaryImage | null> {
    const all = await this.getAllSecondaryImages();
    const exists = all.find(img => img.image === data.image);
    if (exists) return null;

    return this.secondaryImageRepository.createSecondaryImage(data);
  }

  async removeSecondaryImageById(id: number): Promise<SecondaryImage | null> {
    return this.secondaryImageRepository.removeSecondaryImageById(id);
  }
}
