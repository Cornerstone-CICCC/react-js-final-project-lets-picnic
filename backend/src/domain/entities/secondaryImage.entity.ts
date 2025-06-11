export class SecondaryImage {
  constructor(
    private readonly _id: number,
    private _secondaryImage: string,
    private readonly _createdAt: string,
    private _updatedAt: string,
    private _productId?: number
  ) {}

  get id(): number {
    return this._id;
  }

  get image(): string {
    return this._secondaryImage;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  get updatedAt(): string {
    return this._updatedAt;
  }


  updateImage(secondaryImage: string): void {
    this._secondaryImage = secondaryImage;
    this.touchUpdatedAt();
  }

  private touchUpdatedAt(): void {
    this._updatedAt = new Date().toISOString();
  }

  toPlainObject() {
    return {
      id: this._id,
      image: this._secondaryImage,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      productId: this._productId,
    };
  }
}
