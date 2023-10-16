import Image from "next/image";

export default function Bannerberanda() {
    return (
        <div className="w-full">
            <Image
                src={'/kecimol-lombok-nusa-tenggara-barat.png'}
                width={1500}
                height={500}
                alt="kecimol lombok nusa tenggara barat"
                priority
            />
        </div>
    )
}
