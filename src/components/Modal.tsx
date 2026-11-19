import { type PropsWithChildren } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({
  isOpen,
  onClose,
  children
}: PropsWithChildren<ModalProps>) => (
  !isOpen ? null : (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-scrim/75 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90dvh] w-full min-w-0 max-w-5xl overflow-y-auto rounded-2xl border border-divider bg-panel p-4 shadow-xl sm:p-6"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-raised hover:text-ink"
          onClick={onClose}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  )
);

export default Modal;
