"use client";

import { Button } from "@/components/ui/button";
import { Check, ShareIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

// Fix the type definition in props
interface CopyButtonProps {
  userId?: string | null;
}

export const CopyButton = ({ userId }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  } as const;

  const onCopy = useCallback(() => {
    // Use the userId in the copy text if available
    const copyText = userId 
      ? `http://localhost:3000/profile/${userId}`
      : "https://yourdomain.com/profile";
      
    navigator.clipboard.writeText(copyText).catch(console.error);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }, [userId]);

  const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.span
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {children}
    </motion.span>
  );

  return (
    <div className="space-y-2">
      <Button
        onClick={onCopy}
        className="border border-gray-300 rounded-md p-2 cursor-pointer [&_svg]:stroke-gray-800 hover:bg-gray-50 hover:[&_svg]:stroke-black border:border-gray-400"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <IconWrapper key="checkmark">
              <div className="flex gap-2 hover:text-black items-center">
                <Check size={16} className="stroke-white hover:stroke-black" /> Copy
              </div>
            </IconWrapper>
          ) : (
            <IconWrapper key="copy">
              <div className="flex gap-2 hover:text-black items-center">
                <ShareIcon className="stroke-white hover:stroke-black" />
                Share page
              </div>
            </IconWrapper>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
};