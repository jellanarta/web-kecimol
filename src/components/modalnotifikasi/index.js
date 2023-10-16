export default function Modalnotifikasi({ children }) {
    return (
        <div className="fixed w-full h-full z-[1000000] left-0 top-0 flex justify-center items-center" style={{ background: 'rgba(0,0,0,0.2)' }}>
            <div className="w-full max-w-[400px] bg-white rounded-sm px-5 py-7 m-5">
                {children}
            </div>
        </div>
    )
}
