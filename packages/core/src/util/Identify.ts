declare class Identifier<T extends string> {
  private IDENTITY: T;
}

export type Identify<T extends string, U> = Identifier<T> & U;
