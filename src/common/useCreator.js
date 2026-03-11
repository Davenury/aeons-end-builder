import {useState, useRef} from 'react';
import { toPng } from "html-to-image";

export default function useCreator(defaultForm = {}) {
    const [form, setForm] = useState(defaultForm)

    const ref = useRef()

    const importRef = useRef()

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

    const importForm = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                setForm(data); // update your state
            } catch (err) {
                alert("Invalid JSON file");
            }
        };

        reader.readAsText(file);
    }

    const exportForm = () => {
        const formatted = JSON.stringify(form, null, 2)
        const blob = new Blob([formatted], { type: "application/json" })
        const url = URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        link.download = `${form.name.replace(/\s+/g, "_")}.json`
        link.click()

        URL.revokeObjectURL(url)
    }

    return {
        form,
        setForm,
        captureRef: ref,
        handleCapture,
        importForm,
        importRef,
        exportForm
    }
}