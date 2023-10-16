export default function Notifikasikosong({ children }) {
    return (
        <div className="border border-dashed border-orange-500 p-5 text-center text-sm">
            <div className="max-w-[400px] mx-auto">
                {children}
            </div>
        </div>
    )
}
