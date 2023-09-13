import { motion } from "framer-motion";

export default function LoadingLayout() {
  return (
    <div className="grid h-screen place-items-center bg-static-surface-nested">
      <motion.div
        initial={{ scale: 0.85, opacity: 0.15 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{
          duration: 2,
          ease: "easeIn",
        }}
      >
        <span className="label-large-strong text-xl text-white">Solstice</span>
      </motion.div>
    </div>
  );
}
