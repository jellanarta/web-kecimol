import Image from 'next/image'

export default function Pembukaan() {
    return (
        <div className="flex justify-center p-5 mt-10">
            <div className='w-full max-w-[500px]'>
                <Image
                    src={'/searchkecimol.png'}
                    width={500}
                    height={500}
                    alt="searc kecimol"
                />
                <div className="text-sm uppercase mt-5 font-semibold text-center">
                    masukan nama atau username kecimol yang ingin di cari...
                </div>
            </div>
        </div>
    )
}
