import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

type FlipWordsProps = {
  words: string[]
  duration?: number
  className?: string
  /** When true, the flipping word is horizontally centered (e.g. mobile hero). */
  center?: boolean
}

export function FlipWords({ words, duration = 3000, className, center = false }: FlipWordsProps) {
  const [currentWord, setCurrentWord] = useState(words[0] ?? '')
  const [isAnimating, setIsAnimating] = useState(false)
  const fallbackWord = getLongestWord(words)

  const startAnimation = useCallback(() => {
    const nextWord = words[words.indexOf(currentWord) + 1] || words[0] || ''
    setCurrentWord(nextWord)
    setIsAnimating(true)
  }, [currentWord, words])

  useEffect(() => {
    if (isAnimating) return

    const timeout = window.setTimeout(() => {
      startAnimation()
    }, duration)

    return () => window.clearTimeout(timeout)
  }, [isAnimating, duration, startAnimation])

  return (
    <span
      className={twMerge(
        'relative min-h-[1.1em] items-start',
        center ? 'flex w-full justify-center text-center' : 'inline-flex text-left',
        className,
      )}
    >
      <span className="invisible whitespace-pre" aria-hidden="true">
        {fallbackWord}
      </span>
      <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          exit={{ opacity: 0, y: -40, x: center ? 0 : 40, filter: 'blur(8px)', scale: 1.05 }}
          className={twMerge(
            'absolute top-0 z-10',
            center ? 'left-0 right-0 flex flex-wrap justify-center' : 'left-0 inline-block',
          )}
          key={currentWord}
        >
          {currentWord.split(' ').map((word, wordIndex) => (
            <motion.span
              key={`${word}-${wordIndex}`}
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: wordIndex * 0.3, duration: 0.3 }}
              className="inline-block whitespace-nowrap"
            >
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={`${word}-${letter}-${letterIndex}`}
                  initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: wordIndex * 0.3 + letterIndex * 0.05, duration: 0.2 }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function getLongestWord(words: string[]) {
  if (words.length === 0) return ''
  return words.reduce((longest, current) => (current.length > longest.length ? current : longest), words[0])
}
