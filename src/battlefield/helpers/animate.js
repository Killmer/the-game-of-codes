const animate = (frames, setState, fps) => {
  return new Promise(resolve => {
    let frame = 1;
    let lastFrame = Object.keys(frames).length;

    const animateInterval = setInterval(() => {
      if (frame === lastFrame) {
        resolve();
        clearInterval(animateInterval);
      }
      const { width, x, y, height } = frames[frame];
      setState({
        width,
        x,
        y,
        height
      });
      frame += 1;
    }, 1000 / fps);
  });
};

export default animate;
