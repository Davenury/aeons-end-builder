import {useState, useRef} from 'react';
import html2canvas from 'html2canvas';

export default function useCreator(defaultForm = {}) {
    const [form, setForm] = useState(defaultForm)

    const ref = useRef()

    const handleCapture = () => {
        const element = ref.current

        html2canvas(element, { useCORS: true, allowTaint: false }).then(canvas => {
            const imgData = canvas.toDataURL("image/png")

            const link = document.createElement("a")
            link.href = imgData
            link.download = `${form.name}.png`
            link.click();
        })
    }

    return {
        form,
        setForm,
        captureRef: ref,
        handleCapture
    }
}