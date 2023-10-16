import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import Link from 'next/link';
export default function Semuakecimol({ databeranda }) {
    return (
        <>
            {
                databeranda.semuakecimol?.length ?
                    <div>
                        <div>
                            <div className="text-sm uppercase font-semibold">
                                semua Kecimol
                            </div>
                            <div className="text-xs">
                                semua kecimol lombok nusa tenggara barat
                            </div>
                        </div>
                        <div className="mt-5">
                            <Splide aria-label="kecimol lombok nusa tenggara barat"
                                options={{
                                    autoWidth: true,
                                    autoHeight: true,
                                    gap: '18px',
                                    arrows: false,
                                    pagination: false
                                }}>
                                {
                                    databeranda.semuakecimol.map((dt, idx) => (
                                        <SplideSlide key={idx}>
                                            <div className="w-[70px]">
                                                <Link href={`/${dt.username}`}>
                                                    <div className="w-[70px] h-[70px] rounded-full ring-1 ring-gray-200 relative">
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_SERVER}/profil-kecimol/${dt.poto_profil}`}
                                                            sizes='100%'
                                                            alt={dt.nama}
                                                            fill
                                                            style={{
                                                                borderRadius: '100%',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                    </div>
                                                </Link>
                                                <div className="text-xs line-clamp-1 mt-1">
                                                    {dt.nama.toLowerCase()}
                                                </div>
                                            </div>
                                        </SplideSlide>
                                    ))
                                }
                            </Splide>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}
