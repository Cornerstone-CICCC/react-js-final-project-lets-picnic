import { SecondaryImage } from "../entities/secondaryImage.entity";

export interface SecondaryImageCreateInput {
  image: string;
}

export interface SecondaryImageRepository {
  getAllSecondaryImages(): Promise<SecondaryImage[]>;
  getSecondaryImageById(id: number): Promise<SecondaryImage | null>;
  createSecondaryImage(data: SecondaryImageCreateInput): Promise<SecondaryImage | null>;
  removeSecondaryImageById(id: number): Promise<SecondaryImage | null>;
}
