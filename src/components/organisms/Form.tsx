import * as React from "react"
import { motion } from "framer-motion"
import * as FormPrimitive from "@radix-ui/react-form"
import { cn } from "@/lib/utils"

interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (data: FormData) => void
  children: React.ReactNode
}

const formAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, onSubmit, children, ...props }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      onSubmit(formData)
    }

    return (
      <motion.div
        variants={formAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <FormPrimitive.Root
          className={cn("space-y-6", className)}
          onSubmit={handleSubmit}
          ref={ref}
          {...props}
        >
          {children}
        </FormPrimitive.Root>
      </motion.div>
    )
  }
)
Form.displayName = "Form"

const FormField = FormPrimitive.Field
const FormLabel = FormPrimitive.Label
const FormMessage = FormPrimitive.Message
const FormControl = FormPrimitive.Control

export { Form, FormField, FormLabel, FormMessage, FormControl } 