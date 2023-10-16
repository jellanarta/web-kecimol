import { KapitalTeks } from "../../../../lib/public/fnc"
import Parent from "./parent"

const dataoke = {
    title: KapitalTeks('setujui pendaftara kecimol'),
    description: KapitalTeks('setujui pendaftaran kecimol untuk mulai membuat jadwal'),
    keywords: 'pendaftaran kecimol, setujui pendaftaran kecimol'
}
export const metadata = {
    ...dataoke,
    robots: {
        index: false,
        follow: false,
        nocache: true
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/admin/setujui-kecimol`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    openGraph: {
        title: dataoke.title,
        description: dataoke.description,
        images: '/setujui-kecimol.jpg',
        url: `${process.env.NEXT_PUBLIC_CLIENT}/admin/setujui-kecimol`,
        type: 'article',
        locale: 'id_ID',
        authors: process.env.NEXT_PUBLIC_AUTHOR
    },
}
export default function Page() {
    return (
        <Parent />
    )
}
