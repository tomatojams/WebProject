const rowVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // 자식 요소마다 지연 시간 추가로 순차적 등장
    },
  },
  exit: {},
};

const boxVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
  hover: {
    zIndex: 99,
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.2,
      duration: 0.3,
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
