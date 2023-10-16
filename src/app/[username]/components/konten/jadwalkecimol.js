"use client"
import { useSearchParams } from "next/navigation";
import Settypedanbulan from "./jadwal/settypedanbulan";
import { useSelector } from "react-redux";
import moment from 'moment'
import 'moment/locale/id'
import { limaBulanJadwal } from "../../../../../lib/fnc";
import { KapitalTeks } from "../../../../../lib/public/fnc";
import Carijadwal from "./jadwal/carijadwal";
import { useState } from "react";
import Sharejadwal from "@/components/share/sharejadwal";
moment.locale('id')
export default function Jadwalkecimol({ data }) {
    const statekategori = useSelector(state => state.stateKategoriacara)
    const jadwalape = useSearchParams()
    const tipenya = jadwalape.get("type")
    const bulannya = jadwalape.get('bulan')
    const cekapakahada = e => {
        const jadin = e.split("-").join(" ")
        const konterarak = []
        if (statekategori.kategoriacara.length) {
            statekategori.kategoriacara.map(dt => konterarak.push(dt.nama))
        }
        if (konterarak.includes(jadin)) {
            return jadin
        } else {
            return null
        }
    }
    const apakahadabulan = e => {
        if (!e) {
            return moment().format("MMMM YYYY")
        }
        const limanya = limaBulanJadwal()
        const periksani = KapitalTeks(e.split("-").join(" "))
        if (limanya.includes(periksani)) {
            return periksani
        } else {
            return moment().format("MMMM YYYY")
        }
    }
    const [arakteshare, setArakteshare] = useState([])
    function ambilelekdalam(e) {
        setArakteshare(e)
    }
    return (
        <div>
            {/* type jadwal dan bulan jadwal */}
            <Settypedanbulan data={data} />
            {/* type jadwal dan bulan jadwal */}
            <div className="bg-white rounded-sm px-5 py-7 m-5">
                <div className="uppercase font-semibold text-sm">
                    jadwal {tipenya ? cekapakahada(tipenya) ? <span className="text-orange-600">{cekapakahada(tipenya)}</span> : null : null} kecimol <span className="text-blue-600">{data.nama}</span> bulan {apakahadabulan(bulannya)}
                </div>
                {
                    arakteshare.length ?
                        <Sharejadwal
                            tanggal={true}
                            tipejadwal={tipenya ? cekapakahada(tipenya) ? cekapakahada(tipenya) : '' : ''}
                            dari={`kecimol ${data.nama}`}
                            pada={`bulan ${apakahadabulan(bulannya)}`}
                            jadwal={arakteshare}
                        />
                        : null
                }
            </div>
            <Carijadwal data={data} ambilelekdalam={ambilelekdalam} />
        </div>
    )
}
