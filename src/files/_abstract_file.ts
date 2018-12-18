import {IFile} from "./_ifile";

export abstract class AbstractFile implements IFile {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  public getFilename(): string {
    return this.filename;
  }

  public getObjectType(): string {
    const base = this.getFilename().split("/").reverse()[0];
    const split = base.split(".");
    return split[1].toUpperCase();
  }

  public getObjectName(): string {
    const base = this.getFilename().split("/").reverse()[0];
    const split = base.split(".");
    return split[0].toUpperCase();
  }

  public abstract getRaw(): string;
  public abstract getRawRows(): string[];
}