export function uniqByHref<T>(arr: T): T {
  const seen = new Set<string>();
  // @ts-ignore
  return arr.filter((i) => {
    const hasSeenHref = seen.has(i.href);
    if (!hasSeenHref) {
      seen.add(i.href);
    }
    return !hasSeenHref;
  });
}
