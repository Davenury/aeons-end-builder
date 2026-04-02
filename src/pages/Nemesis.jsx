import {useState, useEffect} from 'react';
import useCreator from '../common/useCreator';
import useImageUpload from '../common/useImageUpload';
import enrichText from '../common/enriches'
import { useLocalStorage } from "@uidotdev/usehooks";
import AdvancedSettingsComponent from '../common/advancedSettingsComponents';
import DataHandler from '../components/DataHandler';
import sanitizeCustomStyle from '../common/sanitize'

export default function Nemesis() {
    const [nemesisForm, saveNemesisForm] = useLocalStorage("nemesis", {})
    const { form, setForm, captureRef, handleCapture, importRef, importForm, exportForm } = useCreator({
        name: 'Lord of Chaos',
        text: 'When prepared, no ally can be exhausted and Gravehold cannot be destroyed (always on 1 health)',
        cast: 'Win the fight',
        lore: 'This is bullshit ~ Nemesis',
        cost: 0,
        artImageUrl: 'https://m.media-amazon.com/images/I/81luD-FbWEL._AC_UF1000,1000_QL80_.jpg',
        ...nemesisForm
    });

    const handleSetForm = (form) => {
        setForm(form)
        saveNemesisForm(form)
    }

    return (
        <div>
            <h1>Nemesis Creation</h1>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: "16px"}}>
                <DataHandler handleCapture={handleCapture} importRef={importRef} importForm={importForm} exportForm={exportForm} />
            </div>

            <div style={{display: "flex", flexDirection: "row", gap: "20%"}}>
                <div style={{ flex: "0 0 35%" }}>
                    <NemesisCard form={form} ref={captureRef} />
                </div>

                <div style={{ flex: "1" }}>
                    <NemesisForm form={form} onSubmit={handleSetForm} />
                </div>
            </div>
        </div>
    )
}

function NemesisCard({ form, ref }) {
    const cardWrapperStyle = {
        position: "relative",
        maxWidth: "1200px",
        margin: "0",
        border: '5px solid white',
        zIndex: -2,
        background: 'black',
        overflow: 'hidden'
    };

    const imageStyle = {
        width: "100%",
        height: "100%",
        marginBottom: "-1%"
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

    const innerImageStyle = (top, left, scaleValue = 0, additional = {}) => {
        const scale = 1 + scaleValue / 100;
        return {
            position: "absolute",
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-50%) scale(${scale})`,
            objectFit: 'contain',
            maxWidth: 'none',
            width: '100%',
            height: '100%',
            ...additional,
        }
    }

    const customBackgroundStyle = (additional) => ({...imageStyle, ...additional})

    const textStyleBlack = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'black', ...additional })
    const textStyleWhite = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'white', ...additional })
    const textStyleLore = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, {...additional})

    return (
        <div ref={ref}>
            <div style={cardWrapperStyle}>
                <img style={{...innerImageStyle(form.artTop || 0, form.artLeft || 50, form.artScale || 0, {zIndex: -1}), ...customBackgroundStyle(sanitizeCustomStyle(form.artImageUrlCustomStyle))}} src={form.artImageUrl} />
                <img src={`${process.env.PUBLIC_URL}/nemesis-page/Nememplate.png`} style={imageStyle} />
                <div style={textStyleWhite(form.nameTop || 40, form.nameLeft || 50, form.nameFontSize || "1.7vw", {fontWeight: 'bold', whiteSpace: 'nowrap', ...sanitizeCustomStyle(form.nameCustomStyle)})}>{enrichText(form.name || '')}</div>
                <div style={textStyleWhite(form.nemesisHPTop || 46.5, form.nemesisHPLeft || 49.5, form.nemesisHPFontSize || "0.8vw", {display: "flex", flexDirection: 'column', ...sanitizeCustomStyle(form.nemesisHPCustomStyle)})}>
                    <div>{enrichText(form.nemesisHP || '')}</div>
                </div>
                <div style={textStyleBlack(form.unleashTop || 53, form.unleashLeft || 25, form.unleashFontSize || "0.8vw", {width: '45%', ...sanitizeCustomStyle(form.unleashCustomStyle)})}>{enrichText(form.unleash || '')}</div>
                <div style={textStyleBlack(form.increasedDifficultyTop || 53, form.increasedDifficultyLeft || 75, form.increasedDifficultyFontSize || "0.8vw", { width: '40%', ...sanitizeCustomStyle(form.increasedDifficultyCustomStyle)})}>{enrichText(form.increasedDifficulty || '')}</div>
                <div style={textStyleBlack(form.additionalRulesTop || 65, form.additionalRulesLeft || 50, form.additionalRulesFontSize || "0.8vw", {width: '80%', textAlign: 'left', ...sanitizeCustomStyle(form.additionalRulesCustomStyle)})}>{enrichText(form.additionalRules || '')}</div>
            </div>

            <div style={{marginTop: '32px'}}></div>

            <div style={cardWrapperStyle}>
                <img style={{...innerImageStyle(form.artTop || 0, form.artLeft || 50, form.artScale || 0, {zIndex: -1}), ...customBackgroundStyle(sanitizeCustomStyle(form.artImageUrlCustomStyle))}} src={form.artImageUrl} />
                <img src={`${process.env.PUBLIC_URL}/nemesis-page/NememplateBack.png`} style={imageStyle} />
                <div style={textStyleBlack(form.difficultyTop || 37.2, form.difficultyLeft || 49.5, form.difficultyFontSize || "0.8vw", {fontWeight: 'bold', whiteSpace: 'nowrap', ...sanitizeCustomStyle(form.difficultyCustomStyle)})}>{enrichText(form.difficulty || '')}</div>
                <div style={textStyleBlack(form.setupTop || 47, form.setupLeft || 50, form.setupFontSize || "0.9vw", {display: "flex", flexDirection: 'column', textAlign: 'left', ...sanitizeCustomStyle(form.setupCustomStyle)})}>
                    <div>{enrichText(form.setup || '')}</div>
                </div>
                <div style={textStyleLore(form.loreTop || 80, form.loreLeft || 50, form.loreFontSize || "0.8vw", {...sanitizeCustomStyle(form.loreCustomStyle)})}>{enrichText(form.lore)}</div>
                <div style={textStyle(form.creditsTop || 96, form.creditsLeft || 5, form.creditsFontSize || "12px", {...sanitizeCustomStyle(form.creditsCustomStyle)})}>{enrichText(form.credits || '')}</div>
            </div>
        </div>
    )
}

function NemesisForm({ cardType, form, onSubmit }) {
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

    const name = () => {
        const input = (<div className="form-row">
                <label>Nemesis Name</label>
                <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="The Lord of Chaos"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"name"} topPlaceholder={"63"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }

    const nemesisHP = () => {
        const input = (<div className="form-row">
                <label>Nemesis HP</label>
                <input
                name="nemesisHP"
                type="number"
                min="0"
                value={form.nemesisHP}
                onChange={handleChange}
                placeholder="70"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"nemesisHP"} topPlaceholder={"77"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }

    const unleash = () => {
        const input = (<div className="form-row">
                <label>Uleash</label>
                <input
                name="unleash"
                value={form.unleash}
                onChange={handleChange}
                placeholder="Nemesis gets 2 Nemesis Tokens"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"unleash"} topPlaceholder={"6.5"} leftPlaceholder={"91.5"} form={form} handleChange={handleChange} />
        )
    }

    const cardArt = () => {
        const input = (
            <div>
                <div className="form-row">
                    <label>Art</label>
                    <input
                    type="file"
                    name="artImageUrl"
                    onChange={handleFileChange}
                    />
                </div>
            </div>
        )

        return (
            <AdvancedSettingsComponent type={"nemesisImage"} input={input} name={"art"} topPlaceholder={"0"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }

    const increasedDifficulty = () => {
        const input = (<div className="form-row">
                <label>Increased Difficulty</label>
                <input
                name="increasedDifficulty"
                value={form.increasedDifficulty}
                onChange={handleChange}
                placeholder="You die"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"increasedDifficulty"} topPlaceholder={"96"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }

    const additionalRules = () => {
        const input = (<div className="form-row">
                <label>Additional Rules</label>
                <textarea
                maxLength={form.additionalRulesCharLimit || "2000"}
                name="additionalRules"
                value={form.additionalRules}
                onChange={handleChange}
                rows={4}
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"additionalRules"} topPlaceholder={"73"} leftPlaceholder={"71"} form={form} handleChange={handleChange} />
        )
    }

    const difficulty = () => {
        const input = (<div className="form-row">
                <label>Difficulty</label>
                <input
                name="difficulty"
                type="number"
                min="0"
                value={form.difficulty}
                onChange={handleChange}
                placeholder="1"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"difficulty"} topPlaceholder={"77"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }

    const setup = () => {
        const input = (<div className="form-row">
                <label>Setup</label>
                <textarea
                maxLength={form.setupCharLimit || "200"}
                name="setup"
                value={form.setup}
                onChange={handleChange}
                rows={4}
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} showCharLimit={true} name={"setup"} topPlaceholder={"73"} leftPlaceholder={"71"} form={form} handleChange={handleChange} />
        )
    }

    const lore = () => {
        const input = (<div className="form-row">
                <label>Lore</label>
                <textarea
                maxLength={form.loreCharLimit || "2000"}
                name="lore"
                value={form.lore}
                onChange={handleChange}
                rows={4}
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} showCharLimit={true} name={"lore"} topPlaceholder={"73"} leftPlaceholder={"71"} form={form} handleChange={handleChange} />
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
            <AdvancedSettingsComponent input={input} name={"credits"} topPlaceholder={"95"} leftPlaceholder={"10"} form={form} handleChange={handleChange} />
        )
    }


    return (
        <form className="mage-form" onSubmit={handleSubmit} style={{width: "100%"}}>
            {name()}
            {nemesisHP()}
            {cardArt()}
            {unleash()}
            {increasedDifficulty()}
            {additionalRules()}
            {difficulty()}
            {setup()}
            {lore()}
            {credits()}
        </form>
    )
}
