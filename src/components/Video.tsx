
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VideoProps {
  videoUrl: string;
  className?: string;
}

export const Video = ({ videoUrl, className }: VideoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={cn("rounded-lg overflow-hidden shadow-lg", className)}
    >
      <video
        className="w-full h-full object-cover"
        src={videoUrl}
        controls
        playsInline
        autoPlay
        muted
        loop
      >
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
};
