const animate = (frames, setState, fps) => {
    let frame = 1;
    let lastFrame = Object.keys(frames).length;

    const animateInterval = setInterval(() => {
      if (frame === lastFrame) {
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
  }

  export default animate;