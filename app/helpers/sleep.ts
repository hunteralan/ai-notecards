export async function sleep(handler: () => void, ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      handler();
      resolve();
    }, ms);
  });
}
