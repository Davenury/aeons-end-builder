import {useState, useEffect} from 'react';
import useCreator from '../common/useCreator';
import useImageUpload from '../common/useImageUpload';
import enrichText from '../common/enriches'
import { useLocalStorage } from "@uidotdev/usehooks";
import AdvancedSettingsComponent from '../common/advancedSettingsComponents';
import DataHandler from '../components/DataHandler';
import sanitizeCustomStyle from '../common/sanitize';

export default function Lore() {
    const [loreForm, saveLoreForm] = useLocalStorage("loreCard", {})
    const { form, setForm, captureRef, handleCapture, importForm, importRef, exportForm } = useCreator({
        name: 'Power of friendship',
        text: 'When prepared, no ally can be exhausted and Gravehold cannot be destroyed (always on 1 health)',
        ...loreForm
    });
    const [cardType, setCardType] = useState('front');

    const handleSetForm = (form) => {
        setForm(form)
        saveLoreForm(form)
    }

    return (
        <div>
            <h1>Lore Card Creation</h1>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: "16px"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "30em"}}>
                    <div style={{flexGrow: '3', display: 'flex', width: '80%'}}>
                        <div className={cardType === 'front' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('front')}>Front</div>
                        <div className={cardType === 'back' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('back')}>Back</div>
                    </div>
                </div>
                <DataHandler handleCapture={handleCapture} importRef={importRef} importForm={importForm} exportForm={exportForm} />
            </div>

            <div style={{display: "flex", flexDirection: "row", gap: "2em"}}>
                <div style={{ flex: "0 0 60%" }}>
                    <LoreCard cardType={cardType} form={form} ref={captureRef} />
                </div>

                <div style={{ flex: "1" }}>
                    <LoreForm cardType={cardType} form={form} onSubmit={handleSetForm} />
                </div>
            </div>
        </div>
    )
}

function LoreCard({ cardType, form, ref }) {
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

    const textStyleCardNumber = (top, left, fontSize, additional={}) => textStyle(
        top,
        left,
        fontSize,
        {textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000", ...additional}
    )

    const textStyleBlack = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'black', ...additional })

    return (
        <div style={{...cardWrapperStyle}} ref={ref}>
            <img src={`${process.env.PUBLIC_URL}/lore/${cardType}.png`} style={{...imageStyle}} />
            <div style={textStyleBlack(form.nameTop || 5, form.nameLeft || 50, form.nameFontSize || "1.7vw", {fontWeight: 'bold', whiteSpace: 'nowrap', ...sanitizeCustomStyle(form.nameCustomStyle)})}>{enrichText(form.name || '')}</div>
            <div style={textStyleBlack(form.textTop || 50, form.textLeft || 50, form.textFontSize || "1.3vw", {display: "flex", flexDirection: 'column', textAlign: 'left', ...sanitizeCustomStyle(form.textCustomStyle)})}>
                <div>{enrichText(form.text || '')}</div>
            </div>
            <div style={textStyleCardNumber(form.cardNumberTop || 95, form.cardNumberLeft || 5, form.cardNumberFontSize || "14px", {...sanitizeCustomStyle(form.cardNumberCustomStyle)})}>{enrichText(form.cardNumber || '')}</div>
            <div style={textStyle(form.creditsTop || 95, form.creditsLeft || 90, form.creditsFontSize || "10px", {...sanitizeCustomStyle(form.creditsCustomStyle)})}>{enrichText(form.credits || '')}</div>
        </div>
    )
}

function LoreForm({ form, onSubmit }) {
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

    const cardText = () => {
        const input = (<div className="form-row">
                <label>Card Text</label>
                <textarea 
                name="text"
                value={form.text}
                onChange={handleChange}
                placeholder="Nameless Knowledge"
                maxLength={form.additionalRulesCharLimit || "2000"}
                />
            </div>)
        return (
            <AdvancedSettingsComponent showCharLimit={true} input={input} name={"text"} topPlaceholder={"50"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
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
            {cardNumber()}
            {credits()}
        </form>
    )
}
