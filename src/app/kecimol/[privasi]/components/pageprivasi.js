"use client"
import { useParams } from "next/navigation";
import Deskripsi from "./deskripsi";
import Disclaimer from "./disclaimer";
import Kebijakanprivasi from "./kebijakan-privasi";
import Kontak from "./kontak";
import Syaratdanketentuan from "./syaratdanketentuan";
import Tentang from "./tentang";

export default function Pageprivasi() {
    const paramsnya = useParams()
    const aranah = paramsnya.privasi
    return (
        <div>
            {
                aranah === "kebijakan-privasi" ?
                    <Kebijakanprivasi />
                    : null
            }
            {
                aranah === "syarat-dan-ketentuan" ?
                    <Syaratdanketentuan />
                    : null
            }
            {
                aranah === "disklaimer" ?
                    <Disclaimer />
                    : null
            }
            {
                aranah === "tentang-kami" ?
                    <Tentang />
                    : null
            }
            {
                aranah === "kontak-kami" ?
                    <Kontak />
                    : null
            }
            {
                aranah === "deskripsi" ?
                    <Deskripsi />
                    : null
            }
        </div>
    )
}
