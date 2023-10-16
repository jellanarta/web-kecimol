import { KapitalTeks } from "../../../../lib/public/fnc"
import Parent from "./parent"

export const metadata = {
    title: KapitalTeks('konfirmasi ganti alamat email'),
    description: KapitalTeks('halaman konfirmasi ganti alamat email user'),
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/user/ganti-email`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    themeColor: process.env.NEXT_PUBLIC_WARNA_WEB,
    robots: {
        index: false,
        follow: false,
        nocache: true,
        noimageindex: true,
    },
}
export default function Page() {
    return (
        <Parent />
    )
}
