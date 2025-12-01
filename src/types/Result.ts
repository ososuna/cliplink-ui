export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export const success = <T>(v: T): Result<T> => ({ ok: true, value: v });
export const failure = <E>(e: E): Result<any, E> => ({ ok: false, error: e });
