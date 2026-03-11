import {useState, useRef} from 'react';
import { toPng } from "html-to-image";

export default function useCreator(defaultForm = {}) {
    const [form, setForm] = useState(defaultForm)

    const ref = useRef()

    const handleCapture = async () => {
        const element = ref.current;

        const dataUrl = await toPng(element, {
            pixelRatio: 3,   // 2–4 recommended
            cacheBust: true
        });

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${form.name}.png`;
        link.click();
    };

    return {
        form,
        setForm,
        captureRef: ref,
        handleCapture
    }
}