import { AnimatePresence, motion } from 'framer-motion'

type AlertToastProps = {
  type: 'success' | 'danger'
  text: string
  badges: { success: string; failure: string }
}

export function AlertToast({ type, text, badges }: AlertToastProps) {
  const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.8 },
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div
          className={`flex items-center rounded-md p-5 leading-none text-indigo-100 lg:inline-flex lg:rounded-full ${type === 'danger' ? 'bg-red-800' : 'bg-royal'}`}
        >
          <p
            className={`mr-3 flex rounded-full px-2 py-1 text-xs font-semibold uppercase ${type === 'danger' ? 'bg-red-500' : 'bg-lavender'}`}
          >
            {type === 'danger' ? badges.failure : badges.success}
          </p>
          <p className="mr-2 text-left">{text}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
