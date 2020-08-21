export function getKeysFromEnum<E>(e: E): (keyof E)[] {
  return Object.keys(e) as (keyof E)[];
}
