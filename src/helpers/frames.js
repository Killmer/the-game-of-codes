export const reverseAndMergeFrames = frames => {
  const reversed = Object.values(frames).reverse();

  const framesArr = [...Object.values(frames), ...reversed];

  return framesArr.reduce((result, frame, index) => {
    result[index + 1] = frame;
    return result;
  }, {});
};

export const reverseFrames = frames => {
  const reversed = Object.values(frames).reverse();

  return reversed.reduce((result, frame, index) => {
    result[index + 1] = frame;
    return result;
  }, {});
};
