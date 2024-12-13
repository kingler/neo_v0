import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface PageLayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
  header?: React.ReactNode
  className?: string
}

const layoutAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const contentAnimation = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ children, sidebar, header, className }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn("min-h-screen bg-background", className)}
        variants={layoutAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <AnimatePresence mode="wait">
          {header && (
            <motion.header
              className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
              variants={contentAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {header}
            </motion.header>
          )}
        </AnimatePresence>

        <div className="flex">
          <AnimatePresence mode="wait">
            {sidebar && (
              <motion.aside
                className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-border/40 md:sticky md:block md:w-64"
                variants={contentAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {sidebar}
              </motion.aside>
            )}
          </AnimatePresence>

          <motion.main
            className="flex-1 p-6"
            variants={contentAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {children}
          </motion.main>
        </div>
      </motion.div>
    )
  }
)
PageLayout.displayName = "PageLayout"

export { PageLayout } 