import VortexImage from "../components/VortexImage";
import {useRef, useEffect, useState} from 'react';
import useCreator from '../common/useCreator';
import useImageUpload from '../common/useImageUpload';
import enrichText from '../common/enriches'
import { useLocalStorage } from "@uidotdev/usehooks";
import AdvancedSettingsComponent from '../common/advancedSettingsComponents';
import DataHandler from '../components/DataHandler';

export default function Breach() {
    const [breachForm, saveBreachForm] = useLocalStorage("breach", {})
    const { form, setForm, captureRef, handleCapture, importForm, importRef, exportForm } = useCreator({
        number: 1,
        mainText: 'OPENED BREACH',
        additionalText: null,
        ...breachForm
    });

    const handleSetForm = (form) => {
        setForm(form)
        saveBreachForm(form)
    }

    return (
        <div>
            <h1>Custom Breach Creation</h1>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: "16px"}}>
                <DataHandler handleCapture={handleCapture} importRef={importRef} importForm={importForm} exportForm={exportForm} />
            </div>

            <div style={{display: "flex", flexDirection: "row", gap: "2em"}}>
                <div style={{ flex: "0 0 60%" }}>
                    <BreachView form={form} ref={captureRef} />
                </div>

                <div style={{ flex: "1" }}>
                    <BreachForm form={form} onSubmit={handleSetForm} />
                </div>
            </div>
        </div>
    )
}

function BreachView({ form, ref }) {

    const imageRef = useRef(null);
    const [image, setImage] = useState('')

    useEffect(() => {
        if (!form.breachArt) return;
        const img = new Image();
        img.onload = () => setImage(img);
        img.src = form.breachArt;
    }, [form.breachArt])

    const cardWrapperStyle = {
        position: "relative",
        width: "50%",
        maxWidth: "1200px",
        margin: "0",
        border: '5px solid white',
        aspectRatio: '1 / 1'
    };

    const imageStyle = {
        width: "100%",
        height: "100%",
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

    const innerImageStyle = (top, left, additional = {}) => ({
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        transform: "translate(-50%, -50%)",
        ...additional,
    })

    const vortexStyle = {
        ...imageStyle,
        objectFit: 'cover',
        overflow: 'hidden',
        position: "relative"
    }

    const sanitizeCustomBackgroundStyle = () => {
        try {
            return JSON.parse(form.customBackgroundStyle)
        } catch(e) {
            console.log(e)
            return {}
        }
    }

    const textStyleBlack = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'black', ...additional })

    const isAdditional = () => !!form.breachAdditionalEffect

    return (
        <div style={{...cardWrapperStyle}} ref={ref}>
            <div style={{...vortexStyle, ...sanitizeCustomBackgroundStyle()}} ref={imageRef}>
                <VortexImage image={image} imageRef={imageRef} top={+form.breachArtTop} left={+form.breachArtLeft} swirl={+form.breachArtSwirl} x={+form.breachArtX} y={+form.breachArtY} />
            </div>
            <div>
                <img src={`${process.env.PUBLIC_URL}/breach/${form.breachNumber}.png`} style={innerImageStyle(form.breachNumberTop || 10, form.breachNumberLeft || 53, {width: form.breachNumberWidth || '10%'})} />
            </div>
            <div>
                <img src={`${process.env.PUBLIC_URL}/breach/text${form.breachAdditionalEffect ? '-plus' : ''}.png`} style={innerImageStyle(85, 50, {width: '100%'})} />
            </div>
            <div style={{...textStyleBlack(form.breachTextTop || isAdditional() ? 81 : 84, form.breachTextLeft || 50, form.breachTextFontSize || "1.5vw", {fontWeight: 'bold'})}}>
                {enrichText(form.breachText || "OPENED BREACH")}
            </div>
            { isAdditional() &&
                (<div style={{...textStyleBlack(form.breachAdditionalEffectTop || 89, form.breachAdditionalEffectLeft || 50, form.breachAdditionalEffectFontSize || "1.5vw", {fontWeight: 'bold'})}}>
                    {enrichText(form.breachAdditionalEffect || "OPENED BREACH")}
                </div>)
            }
        </div>
    )
}

function BreachForm({ form, onSubmit }) {
    
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

    const breachText = () => {
        const input = (<div className="form-row">
                <label>Breach Text</label>
                <input
                name="text"
                value={form.breachText}
                onChange={handleChange}
                placeholder="OPENED BREACH"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"breachText"} topPlaceholder={"77"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }

    const breachAdditionalEffect = () => {
        const input = (<div className="form-row">
                <label>Breach Additional Effect</label>
                <input
                type="text"
                name="breachAdditionalEffect"
                value={form.breachAdditionalEffect}
                onChange={handleChange}
                placeholder="+1 Damage on Cast"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"breachAdditionalEffect"} topPlaceholder={"6.5"} leftPlaceholder={"91.5"} form={form} handleChange={handleChange} />
        )
    }

    const art = () => {
        const input = (
            <div>
                <div className="form-row">
                    <label>Art</label>
                    <input
                    type="file"
                    name="breachArt"
                    onChange={handleFileChange}
                    />
                </div>
            </div>
        )

        return (
            <AdvancedSettingsComponent input={input} type={"swirl"} name={"breachArt"} topPlaceholder={"0"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }

    const breachNumber = () => {
        const input = (<div className="form-grid">
                <div className="form-row">
                    <label>Breach Number</label>
                    <input
                    name="breachNumber"
                    value={form.breachNumber || 1}
                    onChange={handleChange}
                    placeholder="1"
                    type="number"
                    min="1"
                    max="4"
                    />
                </div>
                <div className="form-row">
                    <label>Breach Number Width</label>
                    <input
                    name="breachNumberWidth"
                    value={form.breachNumberWidth}
                    onChange={handleChange}
                    placeholder="10%"
                    />
                </div>
            </div>)
        return (
            <AdvancedSettingsComponent input={input} type="breach" name={"breachNumber"} topPlaceholder={"96"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }


    return (
        <form className="mage-form" onSubmit={handleSubmit} style={{width: "100%"}}>
            {breachText()}
            {breachAdditionalEffect()}
            {art()}
            {breachNumber()}
        </form>
    )
}
