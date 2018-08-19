const scrollTo = params =>
  new Promise((res, rej) => {
    const {element, to, duration, scrollDirection} = params;
    const start = element[scrollDirection],
      change = to - start,
      increment = 1000 / 60;

    const animateScroll = elapsedTime => {
      elapsedTime += increment;
      const position = easeInOut(elapsedTime, start, change, duration);
      element[scrollDirection] = position;
      if (elapsedTime < duration) {
        window.requestAnimationFrame(animateScroll.bind(null, elapsedTime));
      } else {
        res();
      }
    };

    window.requestAnimationFrame(animateScroll.bind(null, 0));
  });

const easeInOut = (currentTime, start, change, duration) => {
  currentTime /= duration / 2;
  if (currentTime < 1) {
    return (change / 2) * currentTime * currentTime + start;
  }
  currentTime -= 1;
  return (-change / 2) * (currentTime * (currentTime - 2) - 1) + start;
};

export default scrollTo;
