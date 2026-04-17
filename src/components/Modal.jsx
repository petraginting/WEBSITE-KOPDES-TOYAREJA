import { createPortal } from "react-dom";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = "520px",
}) {
  if (!isOpen) return null;

  // membungkus modal dengan createPortal agar dia "keluar" dari layout sidebar/konten
  return createPortal(
    <div className="fixed inset-0 z-[999] flex justify-center items-start overflow-y-auto pt-10 pb-10 backdrop-blur-md bg-[#0f1a2e]/40 animate-fadeIn">
      {/* Background overlay yang menutupi seluruh layar */}
      <div className="fixed inset-0 cursor-pointer" onClick={onClose}></div>

      {/* Kotak Modal */}
      <div
        className="bg-white rounded-[20px] shadow-[0_12px_40px_rgba(15,26,46,0.25)] relative z-[1000] animate-scaleIn flex flex-col h-fit"
        style={{ width: width }}
      >
        {/* Header Modal */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between shrink-0 bg-white rounded-t-[20px]">
          <h3 className="text-base font-bold text-dark">{title}</h3>
          <button
            onClick={onClose}
            className="w-[30px] h-[30px] border border-border rounded-lg bg-transparent flex items-center justify-center text-sm hover:bg-[#fee2e2] hover:border-[#fecaca] hover:text-[#991b1b] transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Isi Modal */}
        <div className="p-6">{children}</div>

        {/* Footer Modal */}
        {footer && (
          <div className="px-6 py-4 border-t border-border flex justify-end gap-2.5 shrink-0 bg-white rounded-b-[20px]">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body, // Tempat "teleport" modal ke level tertin
  );
}
