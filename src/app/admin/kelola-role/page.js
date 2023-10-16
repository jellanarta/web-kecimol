import { KapitalTeks } from "../../../../lib/public/fnc"
import Parent from "./parent"

const dataoke = {
    title: KapitalTeks('kelola role para user kecimol.com'),
    description: KapitalTeks('kelola role para user, ubah atau hapus sesuai kebutuhan anda'),
    keywords: 'kelola role'
}
export const metadata = {
    ...dataoke,
    robots: {
        index: false,
        follow: false,
        nocache: true
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/admin/kelola-role`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    openGraph: {
        title: dataoke.title,
        description: dataoke.description,
        images: '/dikelola.jpg',
        url: `${process.env.NEXT_PUBLIC_CLIENT}/admin/kelola-role`,
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
