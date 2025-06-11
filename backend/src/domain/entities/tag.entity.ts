export class Tag {
  constructor(
    private readonly _id: number,
    private _tagName: string,
    private readonly _createdAt: string,
    private _updatedAt: string,
  ) {}

  get id(): number {
    return this._id;
  }

  get tagName(): string {
    return this._tagName;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  get updatedAt(): string {
    return this._updatedAt;
  }


  updateTag(tagName: string): void {
    this._tagName = tagName;
    this.touchUpdatedAt();
  }

  private touchUpdatedAt(): void {
    this._updatedAt = new Date().toISOString();
  }

  toPlainObject() {
    return {
      id: this._id,
      tagName: this._tagName,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
