"use client"

import Image from "next/image"
import { useState } from "react"

export default function Input({ pesanError, value, path, onChangeValue, type = 'text', ikon = 'userperson' }) {
    const [kontertype, setKontertype] = useState(type)
    const [typepassword, settypepassword] = useState(true)
    const memanipulasiType = () => {
        if (typepassword) {
            settypepassword(false)
            setKontertype('text')
        } else {
            settypepassword(true)
            setKontertype('password')
        }
    }
    return (
        <div>
            <div className="relative flex items-center">
                <div className="absolute w-4 h-4 left-3">
                    <Image
                        src={`/icons/${ikon}.svg`}
                        width={100}
                        height={100}
                        alt="ikon"
                    />
                </div>
                <input type={kontertype}
                    className={`outline-none pl-10 py-3 w-full focus:ring-blue-400 ring-1 ${pesanError[path].error ? 'ring-red-400' : 'ring-gray-200 '} rounded-sm text-sm ${type === "password" ? 'pr-10' : 'pr-3'} `}
                    value={value[path] ? value[path] : ''}
                    placeholder={pesanError[path].message}
                    onChange={e => onChangeValue({ path, value: e.target.value })}
                />
                {
                    type === "password" ?
                        <div className="absolute w-4 h-4 right-3 cursor-pointer" onClick={memanipulasiType}>
                            <Image
                                src={`/icons/${typepassword ? 'noeyepassword' : 'eyepassword'}.svg`}
                                width={100}
                                height={100}
                                alt="ikon"
                            />
                        </div>
                        : null
                }
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
                    {pesanError[path].error ? '' : 'masukan'} {pesanError[path].message}
                </div>
            </div>
        </div>
    )
}
