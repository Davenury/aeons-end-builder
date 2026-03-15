import {useEffect, useState} from 'react';
import useCreator from '../common/useCreator';
import useImageUpload from '../common/useImageUpload';
import AdvancedSettingsComponent from '../common/advancedSettingsComponents';
import enrichText from '../common/enriches'
import { useLocalStorage } from "@uidotdev/usehooks";
import DataHandler from '../components/DataHandler';
import sanitizeCustomStyle from '../common/sanitize';

export default function FriendFoe() {

    const [charges, setCharges] = useState(5)
    const [type, setType] = useState("friend")

    const [mageForm, saveMageForm] = useLocalStorage("friend", {})

    const {form, setForm, captureRef, handleCapture, importForm, importRef, exportForm} = useCreator({
        ...mageForm
    })

    const handleSetForm = (form) => {
        saveMageForm(form)
        setForm(form)
    }

    return (
        <div>
            <h1>Friend and Foe Creation</h1>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: "16px"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "30em"}}>
                    <div className={charges == 4 ? "primary-btn" : "secondary-btn"} onClick={() => setCharges(4)}>4 Charge</div>
                    <div className={charges == 5 ? "primary-btn" : "secondary-btn"} onClick={() => setCharges(5)}>5 Charge</div>
                    <div className={charges == 6 ? "primary-btn" : "secondary-btn"} onClick={() => setCharges(6)}>6 Charge</div>
                </div>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "20em"}}>
                    <div className={type == "friend" ? "primary-btn" : "secondary-btn"} onClick={() => setType("friend")}>Friend</div>
                    <div className={type == "foe" ? "primary-btn" : "secondary-btn"} onClick={() => setType("foe")}>Foe</div>
                </div>
                <DataHandler handleCapture={handleCapture} importRef={importRef} importForm={importForm} exportForm={exportForm} />
            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "2em"}}>
                <div style={{ flex: "0 0 60%" }}>
                    <FriendFoeCard charges={charges} type={type} form={form} ref={captureRef} />
                </div>

                <div style={{ flex: "1" }}>
                    <FriendFoeFrom form={form} onSubmit={handleSetForm} />
                </div>
            </div>
        </div>
    )
}

function FriendFoeCard({ charges, form, ref, type }) {

    const cardWrapperStyle = {
        position: "relative",
        width: "100%",
        maxWidth: "480px",     // optional cap
        aspectRatio: "1349 / 2048",  // 🔥 key part
        margin: "0",
        // zIndex: -2,
        overflow: 'hidden',
        border: "1px solid white"
    };

    const imageStyle = {
        width: "100%",
        height: "100%",
        objectFit: 'cover'
    };

    const textStyle = (top, left, fontSize, additional = {}) => ({
        position: "absolute",
        textAlign: "center",
        width: "80%",
        maxWidth: "80%",
        top: `${top}%`,
        left: `${left}%`,
        transform: "translate(-50%, -50%)",
        fontSize,
        color: "white",
        fontFamily: 'kefa',
        ...additional
    })

    const withShadow = (style) => ({
        textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000",
        ...style
    })

    const innerImageStyle = (top, left, scaleValue = 0, additional = {}) => {
        const scale = 1 + scaleValue / 100;
        return {
            position: "absolute",
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            zIndex: -1,
            ...additional,
        }
    }

    const textStyleGold = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'gold', ...additional })
    const textStyleBlack = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'black', ...additional })
    const textStyleStarting = (top, left, fontSize) => textStyle(top, left, fontSize)

    return (
        <div ref={ref} style={{display: 'flex', flexDirection: 'row', gap: '1em'}}>
            {/*front*/}
            <div style={cardWrapperStyle}>
                <img src={`${process.env.PUBLIC_URL}/friends-and-foes/${type}-${charges}-charges.png`} style={imageStyle} />
                <div style={withShadow(textStyle(form.nameTop || 69, form.nameLeft || 50, form.nameFontSize || "1.5vw", {fontWeight: 'bold', ...sanitizeCustomStyle(form.nameCustomStyle)}))}>{enrichText(form.name || '')}</div>
                <div style={withShadow(textStyleGold(form.abilityNameTop || 74, form.abilityNameLeft || 50, form.abilityNameFontSize || "1.2vw", { fontWeight: 'bold', whiteSpace: 'nowrap', ...sanitizeCustomStyle(form.abilityNameCustomStyle)}))}>{enrichText(form.abilityName || '')}</div>
                <div style={withShadow(textStyle(form.abilityDescTop || 80, form.abilityDescLeft || 50, form.abilityDescFontSize || "0.8vw", {...sanitizeCustomStyle(form.abilityDescCustomStyle)}))}>{enrichText(form.abilityDesc || '')}</div>
                <div style={textStyle(form.creditsTop || 96, form.creditsLeft || 5, form.creditsFontSize || "12px", {...sanitizeCustomStyle(form.creditsCustomStyle)})}>{enrichText(form.credits || '')}</div>
            
                 <img style={{...innerImageStyle(form.artTop || 60, form.artLeft || 23, form.artScale || 0), ...sanitizeCustomStyle(form.artCustomStyle)}} width={form.artWidth} src={form.artImageUrl} />
               
            </div>

            <div style={{marginTop: '48px'}}></div>

            {/*back*/}
            <div style={cardWrapperStyle}>
                <img style={imageStyle} src={`${process.env.PUBLIC_URL}/friends-and-foes/${type}-back.jpg`} />
                <div style={textStyleBlack(form.loreTop || 20, form.loreLeft || 50, form.loreFontSize || "1vw", {...sanitizeCustomStyle(form.loreCustomStyle)})}>{enrichText(form.lore || '')}</div>

                <div style={textStyleBlack(form.setupTop || 58, form.setupLeft || 50, form.seupFontSize || "1.2vm", {fontWeight: 'bold'})}>SETUP</div>
                <div style={textStyleBlack(form.setupTop || 65, form.setupLeft || 50, form.seupFontSize || "0.8vw", {...sanitizeCustomStyle(form.setupCustomStyle)})}>{enrichText(form.setup || '')}</div>
            </div>
        </div>
    )
}

function FriendFoeFrom({
    form,
    onSubmit
}) {

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

    const mageName = () => {
        const input = (<div className="form-row">
                <label>Mage Name</label>
                <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ganelon"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"name"} topPlaceholder={"12"} leftPlaceholder={"71"} form={form} handleChange={handleChange} />
        )   
    }

    const mageArt = () => {
        const input = (
            <div>
                <div className="form-grid">
                    <div className="form-row">
                        <label>Art</label>
                        <input
                        type="file"
                        name="artImageUrl"
                        onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-row">
                        <label>Art Width</label>
                        <input
                        name="artWidth"
                        value={form.artWidth}
                        onChange={handleChange}
                        placeholder="40%"
                        />
                    </div>
                </div>
            </div>
        )

        return (
            <AdvancedSettingsComponent input={input} name={"art"} topPlaceholder={"68"} leftPlaceholder={"23"} form={form} handleChange={handleChange} />
        )
    }

    const abilityName = () => {
        const input = (<div className="form-row">
                <label>Ability Name</label>
                <input
                name="abilityName"
                value={form.abilityName}
                onChange={handleChange}
                placeholder="Last-Ditch Effort"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"abilityName"} topPlaceholder={"54"} leftPlaceholder={"71"} form={form} handleChange={handleChange} />
        )
    }

    const abilityDesc = () => {
        const input = (<div className="form-row">
                <label>Ability Description</label>
                <textarea
                maxLength={form.abilityDescCharLimit || "500"}
                name="abilityDesc"
                value={form.abilityDesc}
                onChange={handleChange}
                rows={4}
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"abilityDesc"} topPlaceholder={"73"} leftPlaceholder={"71"} form={form} handleChange={handleChange} />
        )
    }

    const lore = () => {
        const input = (<div className="form-row">
                <label>Lore</label>
                <textarea
                maxLength={form.loreCharLimit || "500"}
                name="lore"
                value={form.lore}
                onChange={handleChange}
                rows={4}
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"lore"} topPlaceholder={"80"} leftPlaceholder={"20"} form={form} handleChange={handleChange} />
        )
    }

    const setup = () => {
        const input = (<div className="form-row">
                <label>Setup</label>
                <textarea
                maxLength={form.setupCharLimit || "500"}
                name="setup"
                value={form.setup}
                onChange={handleChange}
                rows={4}
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"setup"} topPlaceholder={"80"} leftPlaceholder={"20"} form={form} handleChange={handleChange} />
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
        
            
            {mageName()}

            {mageArt()}

            {abilityName()}

            {abilityDesc()}

            {lore()}

            {setup()}

            {credits()}
        </form>
    )
}