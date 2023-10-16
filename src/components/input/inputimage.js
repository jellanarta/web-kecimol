"use client"

import Image from "next/image"
import { useRef } from "react"

export default function Inputimage({ pesanError, path, changeGambarOke, value }) {
    const refImage = useRef(null)
    const clikCostum = () => {
        refImage.current.click()
    }
    const changeFile = e => {
        const fl = e.target.files
        if (fl.length === 1) {
            const file = fl[0]
            const fileType = file.type
            const fileSize = file.size
            const allowType = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
            if (!allowType.includes(fileType)) {
                changeGambarOke({ error: true, message: 'file gambar tidak dizinkan' })
            } else if (fileSize >= 2000000) {
                changeGambarOke({ error: true, message: 'terlalu besar, ukuran gambar maksimal 2MB' })
            } else if (fileSize <= 60000) {
                changeGambarOke({ error: true, message: 'terlalu kecil, ukuran gambar minimal 60KB' })
            } else {
                const reader = new FileReader()
                reader.onload = () => {
                    changeGambarOke({ error: false, data: reader.result })
                }
                reader.readAsDataURL(file)
            }
        }
    }
    return (
        <div>
            <div className={`ring-1 ${pesanError[path].error ? 'ring-red-400' : 'ring-gray-200 '} rounded-sm w-[90px] h-[90px] cursor-pointer hover:ring-blue-400 relative overflow-hidden`} onClick={clikCostum}>
                {
                    value[path].length ?
                        <Image
                            src={value[path]}
                            fill
                            sizes="100"
                            alt="profil kecimol"
                            style={{
                                objectFit: 'cover'
                            }}
                        />
                        :
                        <div className="flex justify-center items-center w-full h-full">
                            <div className="w-10 h-10">
                                <Image
                                    src={`/icons/add-image.svg`}
                                    width={100}
                                    height={100}
                                    alt="ikon"
                                />
                            </div>
                        </div>
                }
            </div>
            <input ref={refImage} type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" multiple={false} onChange={changeFile} />
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
                    {pesanError[path].message}
                </div>
            </div>
        </div>
    )
}
