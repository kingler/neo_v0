import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@/lib/utils"

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

interface FormFieldProps {
  children: React.ReactNode
  label: string
  error?: string
  className?: string
}

const errorAnimation = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, label, error, className }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        <Label>{label}</Label>
        {children}
        <AnimatePresence>
          {error && (
            <motion.p
              className="text-sm font-medium text-destructive"
              variants={errorAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
FormField.displayName = "FormField"

export { FormField } 