"use client"

import { useEffect, useRef, useState } from "react"
import { ScaleLoader } from "react-spinners"

export default function Deskripsikecimol({ placeholder = 'Deskripsi kecimol...', changedeskripsi, value }) {
    const refEditor = useRef()
    const [editoload, setEditoload] = useState(false)
    const { CKEditor, ClassicEditor } = refEditor.current || {}
    useEffect(() => {
        refEditor.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        }
        setEditoload(true)
    }, [])

    return (
        <div className="deskripsikecimol text-sm">
            {
                editoload ?
                    <CKEditor
                        editor={ClassicEditor}
                        data={value}
                        config={{
                            toolbar: [],
                            placeholder
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            changedeskripsi(data)
                        }}
                    />
                    :
                    <div className="flex justify-center">
                        <ScaleLoader color="blue" />
                    </div>
            }
        </div>
    )
}
