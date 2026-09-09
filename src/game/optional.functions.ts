export const getCurrentPosition = (
  newPlayerPosition: number,
  boardLength: number
): number => {
  if (newPlayerPosition <= boardLength) {
    return newPlayerPosition;
  } else {
    return -(boardLength - newPlayerPosition + 1);
  }
} 