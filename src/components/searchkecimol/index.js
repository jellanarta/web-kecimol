"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { PublicSearchKecimol } from "../../../lib/public-request/search-kecimol/fnc"
import Hasilpencarian from "./hasilpencarian"
import Pembukaan from "./pembukaan"
import { addStatistikPerHalaman } from "../../../lib/public-request/statistik/fnc"

export default function Searchkecimol() {
    const router = useRouter()
    const [vlsearch, setVlsearch] = useState('')
    const changedia = e => {
        setVlsearch(e.target.value)
    }
    const [belumcari, setBelumcari] = useState(true)
    const [hasilcari, setHasilcari] = useState({
        loading: false,
        data: [],
        query: ''
    })
    const lalopeten = async e => {
        e.preventDefault()
        setHasilcari({ ...hasilcari, loading: true })
        setBelumcari(false)
        const hasil = await PublicSearchKecimol(vlsearch)
        if (hasil.status === 200) {
            setHasilcari({ ...hasilcari, loading: false, data: hasil.data.kecimol, query: hasil.data.query })
        }
    }
    // menambahkan statistik perhalaman
    const timeoutRef = useRef(null)
    useEffect(() => {
        timeoutRef.current = setTimeout(async () => {
            await addStatistikPerHalaman({ tanggal: new Date().setHours(0, 0, 0, 0), type: 'pencarian' })
        }, 10000)
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])
    return (
        <div className="fixed z-[550000] bg-gray-50 top-0 left-0 w-full h-screen overflow-y-auto">
            <div className="bg-white z-50 sticky top-0 shadow-sm">
                <div className="grid grid-cols-[1fr,auto] gap-5  h-[80px] items-center px-5 max-w-[800px] mx-auto">
                    <form onSubmit={lalopeten}>
                        <div className="  relative flex items-center">
                            <div className="absolute w-4 h-4 left-3">
                                <Image
                                    src={'/icons/search.svg'}
                                    width={100}
                                    height={100}
                                    alt="ikon"
                                />
                            </div>
                            <input type="search" placeholder="cari kecimol..." className="outline-none text-sm rounded-full w-full h-[45px] ring-1 ring-gray-200 pl-10 pr-3 focus:ring-blue-400" onChange={changedia} value={vlsearch} />
                        </div>
                    </form>
                    <div className="w-[45px] h-[45px] rounded-full ring-1 ring-gray-200 cursor-pointer hover:ring-blue-400 flex justify-center items-center" onClick={() => router.back()}>
                        <div className="w-4 h-4">
                            <Image
                                src={'/icons/close.svg'}
                                width={100}
                                height={100}
                                alt='ikon'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[800px] mx-auto">
                {/* image default */}
                {
                    belumcari ?
                        <Pembukaan />
                        : null
                }
                {/* image default */}
                {
                    !belumcari ?
                        <Hasilpencarian hasilpencarian={hasilcari} />
                        : null
                }
            </div>
        </div>
    )
}
