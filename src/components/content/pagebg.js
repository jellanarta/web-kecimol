import Badger from "../badger";

export default function Pagebg({ children, teks = null, type = 'lain' }) {
    return (
        <>
            <div className='bg-white m-5 p-5 rounded-sm grid grid-cols-1 gap-5'>
                <Badger teks={teks} />
                {
                    type === "lain" ?
                        <>
                            <div className="border-b border-gray-100 w-full" />
                            <div>
                                {children}
                            </div>
                        </>
                        : null
                }
            </div>
            {
                type !== "lain" ?
                    <div>
                        {children}
                    </div>
                    : null
            }
        </>
    )
}
