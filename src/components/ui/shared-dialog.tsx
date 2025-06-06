"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

interface SharedDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  size?: "default" | "sm" | "lg"
  showCloseButton?: boolean
  onClose?: () => void
  onSubmit?: () => void
  submitText?: string
  cancelText?: string
  className?: string
  trigger?: ReactNode
}

export function SharedDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "default",
  showCloseButton = false,
  onClose,
  onSubmit,
  submitText = "Save",
  cancelText = "Cancel",
  className,
  trigger,
}: SharedDialogProps) {
  const sizeClasses = {
    default: "sm:max-w-[425px]",
    sm: "sm:max-w-[325px]",
    lg: "sm:max-w-[600px]",
  }

  const defaultFooter = (
    <DialogFooter>
      {showCloseButton && (
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            onClose?.()
            onOpenChange(false)
          }}
        >
          {cancelText}
        </Button>
      )}
      {onSubmit && (
        <Button type="button" onClick={onSubmit}>
          {submitText}
        </Button>
      )}
    </DialogFooter>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={`${sizeClasses[size]} ${className}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {footer || defaultFooter}
      </DialogContent>
    </Dialog>
  )
} 