import Kecimol from "@/components/card/kecimol";

export default function Setujui({ semuakecimol }) {
    return (
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {
                semuakecimol && semuakecimol.length ?
                    semuakecimol.map((dt, idx) => (
                        <Kecimol kecimol={dt} userhapus={false} nomor={idx + 1} key={idx} setujuipendaftaran={true} />
                    ))
                    : null
            }
        </div>
    )
}
