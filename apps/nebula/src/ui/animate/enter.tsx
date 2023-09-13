import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

const enterAnimation = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const enterAnimation1 = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const enterAnimation2 = {
  hidden: { rotateY: -90, opacity: 0 },
  visible: {
    rotateY: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const enterAnimation3 = {
  hidden: { rotateX: -90, opacity: 0 },
  visible: {
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export function EnterAnimation({
  key,
  children,
}: PropsWithChildren<{
  key: any;
}>) {
  return (
    <motion.div
      key={key}
      initial="hidden"
      animate="visible"
      variants={enterAnimation}
    >
      {children}
    </motion.div>
  );
}
