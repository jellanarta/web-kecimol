import { ScaleLoader } from "react-spinners";
import Pembukaan from "./pembukaan";
import Kecimol from "../card/kecimol";

export default function Hasilpencarian({ hasilpencarian }) {
    return (
        <div className="my-7">
            {
                hasilpencarian.loading ?
                    <div className="flex justify-center">
                        <ScaleLoader color="blue" />
                    </div>
                    :
                    <div>
                        {
                            hasilpencarian.data.length ?
                                <div>
                                    <div className="bg-white rounded-sm px-5 py-7 m-5">
                                        <div className="text-sm font-semibold uppercase">
                                            hasil pencarian dengan keywords <span className="text-blue-600">{hasilpencarian.query}</span>
                                        </div>
                                    </div>
                                    <div className="m-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {
                                            hasilpencarian.data.map((dt, idx) => (
                                                <Kecimol kecimol={dt} key={idx} nomor={idx + 1} userhapus={false} adminhapus={false} nonaktivkankecimol={true} />
                                            ))
                                        }
                                    </div>
                                </div>
                                :
                                <div>
                                    <Pembukaan />
                                    <div className="bg-white border border-dashed rounded-sm border-orange-600 p-5  md:py-8 text-center text-sm overflow-hidden m-5">
                                        Tidak ada kecimol yang di temukan dengan keywords <span className="font-semibold text-red-600">{hasilpencarian.query}</span>, coba keywords lain
                                    </div>
                                </div>
                        }
                    </div>
            }

        </div>
    )
}
