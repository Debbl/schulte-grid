export function shuffle<T>(array: T[]) {
  let currentIndex = array.length;
  if (!currentIndex) return [];

  let randomIndex;

  const newArray = [...array];
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }

  return newArray;
}
