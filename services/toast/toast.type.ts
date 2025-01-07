const ToastVariant = {
    SUCCESS: "success",
    ERROR: "error",
    INFO: "info",
    WARNING: "warning"
} as const

export type ToastType = (typeof ToastVariant)[keyof typeof ToastVariant]

export interface ToastOptions {
    type: ToastType
    title: string
    message?: string
}