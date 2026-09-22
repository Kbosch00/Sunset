"use client";

import { createContext, useCallback, useContext, useState } from "react";

type ToastType = "success" | "error";

type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = nextId++;
      setToasts((current) => [...current, { id, message, type }]);

      // Cada toast se quita solo después de un rato
      setTimeout(() => {
        setToasts((current) => current.filter((t) => t.id !== id));
      }, 3000);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* La pila de toasts, siempre pegada abajo al centro de la pantalla */}
      <div className="pointer-events-none fixed inset-x-0 top-6 z-200 flex flex-col items-center gap-2 px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast-enter pointer-events-auto rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-sm ${
              toast.type === "success" ? "bg-rose-500/95" : "bg-stone-700/95"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Se usa así desde cualquier componente: const { showToast } = useToast();
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de un <ToastProvider>");
  }
  return context;
}
