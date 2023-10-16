"use client"
export default function Parentinput({ judul = 'okok', deskripsi = 'haha', children }) {
    return (
        <div className="grid grid-cols-1 gap-5">
            <div>
                <div className="text-xs uppercase font-semibold">
                    {judul}
                </div>
                <div className="text-xs">
                    {deskripsi}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-5">
                {children}
            </div>
        </div>
    )
}
