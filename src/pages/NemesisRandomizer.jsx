import {useState, useEffect} from 'react';
import useCreator from '../common/useCreator';
import useImageUpload from '../common/useImageUpload';
import enrichText from '../common/enriches'
import AdvancedSettingsComponent from '../common/advancedSettingsComponents';
import DataHandler from '../components/DataHandler';
import sanitizeCustomStyle from '../common/sanitize';
import { useLocalStorage } from "@uidotdev/usehooks";

export default function NemesisRandomizer() {
    const [randomizerForm, saveRandomizerForm] = useLocalStorage("nemesisRandomizer", {})
    const { form, setForm, captureRef, handleCapture, importForm, importRef, exportForm } = useCreator({
        mageArt: `${process.env.PUBLIC_URL}/default_art.png`,
        setArt: `${process.env.PUBLIC_URL}/default_art.png`,
        ...randomizerForm
    });

    const handleSetForm = (form) => {
        setForm(form)
        saveRandomizerForm(form)
    }

    return (
        <div>
            <h1>Nemesis Randomizer Card Creation</h1>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: "16px"}}>
                <DataHandler handleCapture={handleCapture} importRef={importRef} importForm={importForm} exportForm={exportForm} />
            </div>

            <div style={{display: "flex", flexDirection: "row", gap: "2em"}}>
                <div style={{ flex: "0 0 60%" }}>
                    <RandomizerCard form={form} ref={captureRef} />
                </div>

                <div style={{ flex: "1" }}>
                    <RandomizerForm form={form} onSubmit={handleSetForm} />
                </div>
            </div>
        </div>
    )
}

function RandomizerCard({form, ref}) {
    const cardWrapperStyle = {
        position: "relative",
        width: "50%",
        maxWidth: "1200px",
        margin: "0",
        border: '2px solid white',
        overflow: 'hidden',
        aspectRatio: '410 / 581'
    };

    const textStyle = (top, left, fontSize, additional = {}) => ({
        position: "absolute",
        textAlign: "center",
        width: "85%",
        top: `${top}%`,
        left: `${left}%`,
        transform: "translate(-50%, -50%)",
        fontSize,
        color: "white",
        ...additional
    })

    const imageStyle = {
        width: "100%",
        height: "100%"
    };

    const innerImageStyle = (top, left, scaleValue = 0, additional = {}) => {
        const scale = 1 + scaleValue / 100;
        return {
            position: "absolute",
            top: `${top}%`,
            left: `${left}%`,
            transform: `scale(${scale}) translate(-50%, -50%)`,
            objectFit: 'cover',
            ...additional,
        }
    }

    return (
        <div style={{...cardWrapperStyle}} ref={ref}>
            <div>
                <img src={form.backArt ?? `${process.env.PUBLIC_URL}/mages/randomizer-default.png`} style={{...imageStyle, position: 'absolute', top: 0, left: 0}} />
                <img src={`${process.env.PUBLIC_URL}/nemesis-page/randomizer.png`} style={{...imageStyle, position: 'absolute', top: 0, left: 0, zIndex: 1}} />
            </div>
            <img src={form.mageArt} style={{...innerImageStyle(form.mageArtTop || 50, form.mageArtLeft || 50, form.mageArtScale || 1, {})}} />
            <div style={textStyle(form.nameTop || 80, form.nameLeft || 50, form.nameFontSize || "1.7vw", {fontWeight: 'bold', whiteSpace: 'nowrap', zIndex: 2, ...sanitizeCustomStyle(form.nameCustomStyle)})}>{enrichText(form.name || '')}</div>
            <img src={form.setArt} style={{...innerImageStyle(form.setArtTop || 90, form.setArtLeft || 50, form.setArtScale || 1, {zIndex: 2})}} />
        </div>
    )
}

function RandomizerForm({form, onSubmit}) {
    useEffect(() => {
        onSubmit?.(form)
    }, [])

    const { handleFileUpload } = useImageUpload()

    const handleSetForm = (name, value) => {
        onSubmit?.(({
            ...form,
            [name]: value,
        }))
    }

    function handleChange(e) {
        const { name, value } = e.target;
        handleSetForm(name, value)
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const base64 = await handleFileUpload(file)
        handleSetForm(e.target.name, base64)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit?.(form);
    }

    const cardName = () => {
        const input = (<div className="form-row">
                <label>Nemesis Name</label>
                <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nameless Knowledge"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"name"} topPlaceholder={"63"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }

    const mageArt = () => {
        const input = (
            <div>
                <div className="form-row">
                    <label>Nemesis Art</label>
                    <input
                    type="file"
                    name="mageArt"
                    onChange={handleFileChange}
                    />
                </div>
            </div>
        )

        return (
            <AdvancedSettingsComponent input={input} name={"mageArt"} topPlaceholder={"0"} leftPlaceholder={"50"} form={form} handleChange={handleChange} type={"art"} />
        )
    }

    const backArt = () => {
        const input = (
            <div>
                <div className="form-row">
                    <label>Background Art</label>
                    <input
                    type="file"
                    name="backArt"
                    onChange={handleFileChange}
                    />
                </div>
            </div>
        )

        return (
            <AdvancedSettingsComponent input={input} name={"backArt"} topPlaceholder={"0"} leftPlaceholder={"50"} form={form} handleChange={handleChange} type={"art"} />
        )
    }

    const setArt = () => {
        const input = (
            <div>
                <div className="form-row">
                    <label>Set Name Art</label>
                    <input
                    type="file"
                    name="setArt"
                    onChange={handleFileChange}
                    />
                </div>
            </div>
        )

        return (
            <AdvancedSettingsComponent input={input} name={"setArt"} topPlaceholder={"0"} leftPlaceholder={"50"} form={form} handleChange={handleChange} type={"art"} />
        )
    }

    return (
        <form className="mage-form" onSubmit={handleSubmit} style={{width: "100%"}}>
            {cardName()}
            {mageArt()}
            {backArt()}
            {setArt()}
        </form>
    )
}