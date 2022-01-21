declare const ValidPath: unique symbol;

export type Path = string & { [ValidPath]: true };

export function validPath(input: string): asserts input is Path {
  if (input.length === 0) throw new Error("Path can't be empty ");
}

export const createPath = (input: string) => {
  validPath(input);

  return input;
};
