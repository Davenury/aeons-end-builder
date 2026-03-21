import {useState, useEffect} from 'react';
import useCreator from '../common/useCreator';
import useImageUpload from '../common/useImageUpload';
import enrichText from '../common/enriches'
import { useLocalStorage } from "@uidotdev/usehooks";
import AdvancedSettingsComponent from '../common/advancedSettingsComponents';
import DataHandler from '../components/DataHandler';
import sanitizeCustomStyle from '../common/sanitize';

export default function Treasure() {
    const [treasureForm, saveTreasureForm] = useLocalStorage("treasureCard", {})
    const { form, setForm, captureRef, handleCapture, importForm, importRef, exportForm } = useCreator({
        name: 'Power of friendship',
        text: 'When prepared, no ally can be exhausted and Gravehold cannot be destroyed (always on 1 health)',
        ...treasureForm
    });
    const [treasureTier, setTreasureTier] = useState(2);

    const handleSetForm = (form) => {
        setForm(form)
        saveTreasureForm(form)
    }

    return (
        <div>
            <h1>Treasure Tier Creation</h1>
            <h3>For Level 1 treasures, refer to Supply page and toggle Treasure toggle.</h3>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: "16px"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "30em"}}>
                    <div style={{flexGrow: '3', display: 'flex', width: '80%'}}>
                        <div className={treasureTier === 2 ? "primary-btn" : "secondary-btn"} onClick={() => setTreasureTier(2)}>Level 2</div>
                        <div className={treasureTier === 'back' ? "primary-btn" : "secondary-btn"} onClick={() => setTreasureTier(3)}>Level 3</div>
                    </div>
                </div>
                <DataHandler handleCapture={handleCapture} importRef={importRef} importForm={importForm} exportForm={exportForm} />
            </div>

            <div style={{display: "flex", flexDirection: "row", gap: "2em"}}>
                <div style={{ flex: "0 0 60%" }}>
                    <TreasureCard treasureTier={treasureTier} form={form} ref={captureRef} />
                </div>

                <div style={{ flex: "1" }}>
                    <TreasureForm treasureTier={treasureTier} form={form} onSubmit={handleSetForm} />
                </div>
            </div>
        </div>
    )
}

function TreasureCard({ treasureTier, form, ref }) {
    const cardWrapperStyle = {
        position: "relative",
        width: "50%",
        maxWidth: "1200px",
        margin: "0",
        border: '2px solid white',
        overflow: 'hidden'
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

    const textShadow = "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000"

    const textStyleCardNumber = (top, left, fontSize, additional={}) => textStyle(
        top,
        left,
        fontSize,
        {textShadow, ...additional}
    )

    const textStyleBlack = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'black', ...additional })
    const textStyleWhite = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'white', textShadow, ...additional })

    return (
        <div style={{...cardWrapperStyle}} ref={ref}>
            <img src={`${process.env.PUBLIC_URL}/supply/treasure${treasureTier}.png`} style={{...imageStyle}} />
            <div style={textStyleWhite(form.nameTop || 12, form.nameLeft || 50, form.nameFontSize || "1.7vw", {fontWeight: 'bold', whiteSpace: 'nowrap', ...sanitizeCustomStyle(form.nameCustomStyle)})}>{enrichText(form.name || '')}</div>
            <div style={textStyleBlack(form.textTop || 50, form.textLeft || 50, form.textFontSize || "1.3vw", {display: "flex", flexDirection: 'column', ...sanitizeCustomStyle(form.textCustomStyle)})}>
                <div>{enrichText(form.text || '')}</div>
            </div>
            <div style={textStyleWhite(form.cardLoreTop || 95, form.cardLoreLeft || 50, form.cardLoreFontSize || "14px", {textShadow: "", ...sanitizeCustomStyle(form.cardLoreCustomStyle)})}>{enrichText(form.cardLore || '')}</div>
            <div style={textStyleCardNumber(form.cardNumberTop || 95, form.cardNumberLeft || 5, form.cardNumberFontSize || "14px", {...sanitizeCustomStyle(form.cardNumberCustomStyle)})}>{enrichText(form.cardNumber || '')}</div>
            <div style={textStyle(form.creditsTop || 95, form.creditsLeft || 90, form.creditsFontSize || "10px", {...sanitizeCustomStyle(form.creditsCustomStyle)})}>{enrichText(form.credits || '')}</div>
        </div>
    )
}

function TreasureForm({ form, onSubmit }) {
    useEffect(() => {
        onSubmit?.(form)
    }, [])

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

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit?.(form);
    }

    const cardName = () => {
        const input = (<div className="form-row">
                <label>Card Name</label>
                <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Chapter 1 Introduction"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"name"} topPlaceholder={"5"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }

    const cardNumber = () => {
        const input = (<div className="form-row">
                <label>Card Number</label>
                <input
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="L01 Front"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"cardNumber"} topPlaceholder={"95"} leftPlaceholder={"5"} form={form} handleChange={handleChange} />
        )
    }

    const cardLore = () => {
        const input = (<div className="form-row">
                <label>Card Lore</label>
                <input
                name="cardLore"
                value={form.cardLore}
                onChange={handleChange}
                placeholder=""
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"cardLore"} topPlaceholder={"95"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }

    const cardText = () => {
        const input = (<div className="form-row">
                <label>Card Text</label>
                <input
                name="text"
                value={form.text}
                onChange={handleChange}
                placeholder="Nameless Knowledge"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"text"} topPlaceholder={"50"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }


    const credits = () => {
        const input = (<div className="form-row">
                <label>Credits</label>
                <input
                name="credits"
                value={form.credits}
                onChange={handleChange}
                rows={4}
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"credits"} topPlaceholder={"95"} leftPlaceholder={"90"} form={form} handleChange={handleChange} />
        )
    }

    return (
        <form className="mage-form" onSubmit={handleSubmit} style={{width: "100%"}}>
            {cardName()}
            {cardText()}
            {cardLore()}
            {cardNumber()}
            {credits()}
        </form>
    )
}
