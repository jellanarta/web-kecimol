"use client"
import Jadwal from "@/components/card/jadwal";
import Sharejadwal from "@/components/share/sharejadwal";
import moment from "moment";
import 'moment/locale/id'
import { cekjamrequestjadwal } from "../../../../../lib/fnc";
moment.locale('id')
export default function Beranda({ data, kecimol }) {
    return (
        <div>
            <div>
                <div className="bg-white rounded-sm px-5 py-7 m-5">
                    <div className="uppercase font-semibold text-sm">
                        jadwal kecimol <span className="text-blue-600">{kecimol.nama}</span> {cekjamrequestjadwal() === moment().startOf('day').valueOf() ? 'hari ini' : 'besok'} tanggal <span className="text-orange-600 uppercase">{moment(cekjamrequestjadwal()).format("dddd, D MMMM YYYY")}</span>
                    </div>
                </div>
                <div className="m-5">
                    {
                        data?.length && data[0].jadwalhariini?.length ?
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {
                                    data[0].jadwalhariini.map((dt, idx) => (
                                        <Jadwal key={idx} jadwal={dt} nomor={idx + 1} />
                                    ))
                                }
                            </div>
                            :
                            <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5 md:py-8 text-center text-sm overflow-hidden">
                                Jadwal kecimol <span className="text-blue-600">{kecimol.nama}</span> {cekjamrequestjadwal() === moment().startOf('day').valueOf() ? 'hari ini' : 'besok'} tanggal <span className="text-orange-600">{moment(cekjamrequestjadwal()).format("dddd, D MMMM YYYY")}</span> kosong
                            </div>
                    }
                </div>
            </div>

            {/* 15 jadwal terbaru */}
            <div>
                <div className="bg-white rounded-sm px-5 py-7 m-5">
                    <div className="uppercase font-semibold text-sm">
                        15 jadwal terbaru kecimol <span className="text-blue-600">{kecimol.nama}</span>
                    </div>
                    {
                        data?.length && data[1]?.limabelasjadwal?.length ?
                            <Sharejadwal
                                tanggal={true}
                                tipejadwal={''}
                                dari={`kecimol ${kecimol.nama}`}
                                pada={`15 jadwal terbarunya`}
                                jadwal={data[1].limabelasjadwal} />
                            : null
                    }
                </div>
                <div className="m-5">
                    {
                        data?.length && data[1].limabelasjadwal?.length ?
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {
                                    data[1].limabelasjadwal.map((dt, idx) => (
                                        <Jadwal key={idx} jadwal={dt} nomor={idx + 1} />
                                    ))
                                }
                            </div>
                            :
                            <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5  md:py-8 text-center text-sm overflow-hidden">
                                Belum ada jadwal kecimol <span className="text-blue-600">{kecimol.nama}</span> yang bisa di tampilkan
                            </div>
                    }
                </div>
            </div>
            {/* 15 jadwal terbaru */}
        </div>
    )
}
