import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { SiteContent } from '../data/site'

type CopyEmailProps = Pick<SiteContent, 'copyEmail'>

export function CopyEmailButton({ copyEmail }: CopyEmailProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    void navigator.clipboard.writeText(copyEmail.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.button
      type="button"
      onClick={copyToClipboard}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 1.05 }}
      className="relative w-[12rem] cursor-pointer overflow-hidden rounded-full bg-primary px-1 py-4 text-center text-sm font-extralight"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
          >
            <img src={`/${copyEmail.copyDoneIcon}`} className="w-5" alt="" />
            {copyEmail.copiedLabel}
          </motion.p>
        ) : (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <img src={`/${copyEmail.copyIcon}`} className="w-5" alt="" />
            {copyEmail.copyLabel}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
