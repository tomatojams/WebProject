const rowVariants = {
  start: { opacity: 0, scale: 0.5 },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      // type: "spring",
      duration: 0.5,
      bounce: 0.5,
      // 하위 컴포넌트에 적용
      delayChildren: 0.2,
      // 하위컴포넌트 텀
      staggerChildren: 0.2,
    },
  },
};

const boxVariants = {
  start: { opacity: 0, y: -10 },
  end: {
    opacity: 1,
    // framer motion에만 있는 특성 x, y
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.3,
    transition: {
      duration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

export { rowVariants, boxVariants, infoVariants };
