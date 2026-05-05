import { X } from 'lucide-react'
import React from 'react'

const PreviewFoto = ({ foto, setIsPreviewOpen }) => {
    return (
        <div
            className="fixed inset-0 z-[60] flex items-center cursor-pointer justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity"
            onClick={() => setIsPreviewOpen(false)}
        >
            <div
                className="relative max-w-sm w-full flex flex-col items-center transition-transform transform scale-100"
                onClick={() => setIsPreviewOpen(false)}
            >
                <img
                    src={foto}
                    alt="Preview Full"
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-sm transition-transform duration-300 scale-150"
                />
            </div>
        </div>
    )
}

export default PreviewFoto
