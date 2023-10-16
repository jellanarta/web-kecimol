"use client"
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Footer() {
    const stateKategoriacara = useSelector(state => state.stateKategoriacara)
    const stateuser = useSelector(state => state.authReducer)
    return (
        <div className="-mb-5 md:-mb-0">
            <div className="bg-gray-500 px-6 py-8  grid grid-cols-1 mt-14 gap-6  lg:px-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-center">
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[auto,1fr] xl:items-center xl:gap-7">
                        <div className="flex justify-center md:justify-start">
                            <div className="w-[130px] h-[130px] ">
                                <Image
                                    src={'/logo.png'}
                                    width={200}
                                    height={200}
                                    priority
                                    alt="kecimol lombok nusa tenggara barat"
                                />
                            </div>
                        </div>
                        <div className="text-center text-gray-50 grid gap-3 md:text-left">
                            <div className="text-base uppercase font-semibold ">
                                kecimol lombok nusa tenggara barat
                            </div>
                            <div className="text-xs text-gray-300">
                                Dapatkan data lengkap semua kecimol lombok nusa tenggara barat yang sudah bergabung di kecimol.com
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-dotted border-gray-200 pt-6 grid grid-cols-1 gap-5 md:border-t-0 md:pt-0 justify-end ">
                        <div className="text-center md:text-right uppercase font-semibold text-sm text-gray-50">
                            ikuti sosial media kami
                        </div>
                        <div className="flex justify-center gap-3 md:justify-end">
                            <Sosialmedia ikon="facebook" username="kecimolntb" />
                            <Sosialmedia ikon="instagram" username="kecimolntb" />
                            <Sosialmedia ikon="tiktok" username="@infokecimol" />
                            <Sosialmedia ikon="youtube" username="@infokecimol" />
                        </div>
                    </div>
                </div>
                <div className="border-t border-dotted border-gray-200 pt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8">
                    <Menujukepage judul="jadwal kecimol">
                        <Menujukepagelink link="/jadwal" teks="hari ini" />
                        {
                            stateKategoriacara.kategoriacara.length ?
                                stateKategoriacara.kategoriacara.map((dt, idx) => (
                                    <Menujukepagelink link={`/jadwal/${dt.nama.split(" ").join("-")}`} teks={dt.nama} key={idx} />
                                ))
                                : null
                        }
                    </Menujukepage>
                    <Menujukepage judul="layanan kecimol">
                        <Menujukepagelink link="/kecimol" teks="semua kecimol" />
                        <Menujukepagelink link="/kecimol/sewa-kecimol" teks="sewa kecimol" />
                        {
                            stateuser?.login ?
                                <>
                                    <Menujukepagelink link="/jadwal/new-jadwal" teks="kirim jadwal kecimol" />
                                    <Menujukepagelink link="/daftarkan-kecimol" teks="daftarkan kecimol" />
                                </>
                                : null
                        }
                    </Menujukepage>

                    <Menujukepage judul="tentang kami">
                        <Menujukepagelink link="/kecimol/deskripsi" teks="deskripsi" />
                        <Menujukepagelink link="/kecimol/kontak-kami" teks="kontak kami" />
                        <Menujukepagelink link="/kecimol/tentang-kami" teks="tentang kami" />
                    </Menujukepage>
                    <Menujukepage judul="kebijakan privasi">
                        <Menujukepagelink link="/kecimol/kebijakan-privasi" teks="kebijakan privasi" />
                        <Menujukepagelink link="/kecimol/syarat-dan-ketentuan" teks="syarat & ketentuan" />
                        <Menujukepagelink link="/kecimol/disklaimer" teks="disklaimer" />
                    </Menujukepage>
                    <Menujukepage judul="blog">
                        <Menujukepagelink blank={true} teks="artikel kecimol" />
                    </Menujukepage>
                </div>
            </div>
            <div className="bg-gray-600 p-5 text-xs text-gray-100 text-center">
                @copyright - <Link href='/'>kecimol.com</Link> - 2023
            </div>
        </div>
    )
}
function Menujukepagelink({ link = '/', teks = 'teks', blank = false }) {
    return (
        <>
            {
                !blank ?
                    <Link href={link}>
                        <div className="text-xs capitalize">
                            {teks}
                        </div>
                    </Link>
                    :
                    <a href={process.env.NEXT_PUBLIC_BLOG} target="_blank">
                        <div className="text-xs capitalize">
                            {teks}
                        </div>
                    </a>
            }
        </>
    )
}
function Menujukepage({ judul = 'judul', children }) {
    return (
        <div className="text-gray-50">
            <div className="text-xs uppercase font-semibold">
                {judul}
            </div>
            <div className="grid grid-cols-1 gap-3 mt-3 text-gray-300">
                {children}
            </div>
        </div>
    )
}


function Sosialmedia({ ikon = 'facebook', username = 'kecimolntb' }) {
    const jarilink = () => {
        return `https://www.${ikon}.com/${username}`
    }
    return (
        <a href={jarilink()} target="_blank">
            <div className="w-8 h-8 rounded-full ring-1 ring-gray-200 bg-white flex justify-center items-center hover:ring-blue-200">
                <div className="w-5 h-5">
                    <Image
                        src={`/icons/${ikon}.svg`}
                        width={100}
                        height={100}
                        alt={ikon}
                    />
                </div>
            </div>
        </a>
    )
}