"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { BarLoader } from "react-spinners"
import Calendar from "react-calendar"

export default function Select({ pesanError, value, path, onChangeValue, ikon = 'userperson', pilihan = [], tampilkantanggal = false }) {
    const [openpilihan, setOpenpilihan] = useState(false)
    const bukatutuppilihan = () => {
        if (openpilihan) {
            setOpenpilihan(false)
        } else {
            setOpenpilihan(true)
        }
    }
    const targetref = useRef(null)
    useEffect(() => {
        const handleclick = event => {
            const target = event.target;
            const isChildOfMenuDesktop = targetref.current?.contains(target);
            if (!isChildOfMenuDesktop) {
                setOpenpilihan(false)
            }
        }
        document.addEventListener("click", handleclick)
        return () => {
            document.removeEventListener("click", handleclick)
        }
    }, [])
    const jadikanpilihan = e => {
        if (tampilkantanggal) {
            // console.log(e);
            const hasil = { tanggal: e, path }
            onChangeValue(hasil)
            setOpenpilihan(false)
        } else {
            const hasil = { ...e, path }
            onChangeValue(hasil)
            setOpenpilihan(false)
        }
    }
    return (
        <div className="relative" ref={targetref}>
            {
                openpilihan ?
                    <div className={`absolute z-10  p-3 ${tampilkantanggal ? '' : 'max-h-[250px] '} overflow-y-auto w-full rounded-sm ring-1 bg-white ring-gray-200 top-0 grid grid-cols-1 gap-2`}>
                        {
                            tampilkantanggal ?
                                <Pilihtampilkantanggal value={value[path]?.tanggal ? value[path].tanggal : null} changeTanggal={jadikanpilihan} />
                                :
                                pilihan && pilihan.length ?
                                    pilihan.map((dt, idx) => (
                                        <div className="flex items-center gap-3 cursor-pointer border-dotted border-b border-gray-200 hover:text-blue-500 hover:border-blue-400 pb-2" key={idx} onClick={() => jadikanpilihan(dt)}>
                                            <div className=" w-[13px] h-[13px] left-3">
                                                <Image
                                                    src={`/icons/${ikon}.svg`}
                                                    width={100}
                                                    height={100}
                                                    alt="ikon"
                                                />
                                            </div>
                                            <div className="text-sm capitalize">
                                                {dt.nama}
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <div className="flex justify-center py-5">
                                        <BarLoader color="blue" size={10} />
                                    </div>
                        }
                    </div>
                    :
                    null
            }
            <div className="relative flex items-center" onClick={bukatutuppilihan}>
                <div className="absolute w-4 h-4 left-3">
                    <Image
                        src={`/icons/${ikon}.svg`}
                        width={100}
                        height={100}
                        alt="ikon"
                    />
                </div>
                <div className={`ring-1 ${pesanError[path].error ? 'ring-red-400' : 'ring-gray-200 '} px-10 py-3 hover:ring-blue-400 cursor-pointer w-full rounded-sm text-sm capitalize`}>
                    {
                        value[path] ? value[path].nama : 'pilih'
                    }
                </div>
                <div className="absolute w-3 h-3 right-3 cursor-pointer">
                    <Image
                        src={`/icons/arrows.svg`}
                        width={100}
                        height={100}
                        alt="ikon"
                    />
                </div>
            </div>
            <div className="mt-1 flex items-start gap-2">
                <div className="w-3 h-3 relative mt-[1px] ">
                    <Image
                        src={'/icons/quote.svg'}
                        width={100}
                        height={100}
                        alt="ikon"
                    />
                </div>
                <div className={`text-xs font-medium ${pesanError[path].error ? 'text-red-500' : 'text-gray-700'}`}>
                    {pesanError[path].error ? '' : 'pilih'} {pesanError[path].message}
                </div>
            </div>
        </div>
    )
}

function Pilihtampilkantanggal({ value = new Date(), changeTanggal }) {
    return (
        <div>
            <Calendar onChange={changeTanggal} value={value ? value : new Date()} />
        </div>
    )
}