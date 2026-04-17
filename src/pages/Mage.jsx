import {useEffect, useState, useRef} from 'react';
import useCreator from '../common/useCreator';
import useImageUpload from '../common/useImageUpload';
import AdvancedSettingsComponent from '../common/advancedSettingsComponents';
import enrichText from '../common/enriches'
import { useLocalStorage } from "@uidotdev/usehooks";
import DataHandler from '../components/DataHandler';
import VortexImage from "../components/VortexImage";
import sanitizeCustomStyle from '../common/sanitize';

export default function Mage() {

    const [charges, setCharges] = useState(5)

    const [mageForm, saveMageForm] = useLocalStorage("mage", {})

    const {form, setForm, captureRef, handleCapture, importForm, importRef, exportForm} = useCreator({
        name: "Ganelon",
        title: "Knower of The Unknown",
        artImageUrl: `${process.env.PUBLIC_URL}/default_art.png`,
        startingDeck: "4x Crystal, 1x Spark",
        startingHand: "1x Nameless Knowledge, 3x Crystal, 1x Spark",
        abilityName: "Last-Ditch Effort",
        abilityUsage: "Activate During Your Main Phase",
        abilityDesc: "Deal 4 damage...",
        artWidth: '30%',
        breach0: 'open',
        breach1: 'left',
        breach2: 'bottom',
        breach3: 'right',
        ...mageForm
    })

    const handleSetForm = (form) => {
        setForm(form)
        saveMageForm(form)
    }

    return (
        <div>
            <h1>Mage Creation</h1>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: "16px"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "40em"}}>
                    <div className={charges == 4 ? "primary-btn" : "secondary-btn"} onClick={() => setCharges(4)}>4 Charge Mage</div>
                    <div className={charges == 5 ? "primary-btn" : "secondary-btn"} onClick={() => setCharges(5)}>5 Charge Mage</div>
                    <div className={charges == 6 ? "primary-btn" : "secondary-btn"} onClick={() => setCharges(6)}>6 Charge Mage</div>
                </div>
                <DataHandler handleCapture={handleCapture} importRef={importRef} importForm={importForm} exportForm={exportForm} />
            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "2em"}}>
                <div style={{ flex: "0 0 60%" }}>
                    <MageCard charges={charges} form={form} ref={captureRef} />
                </div>

                <div style={{ flex: "1" }}>
                    <MageForm form={form} onSubmit={handleSetForm} />
                </div>
            </div>
        </div>
    )
}

const getBreachLeft = (breachNumber) => {
    switch(breachNumber) {
        case 0:
            return 7
        case 1:
            return 31
        case 2:
            return 71.5
        case 3:
            return 96.5
        default:
            console.log(`unknown breach number ${breachNumber}`)
            return 0
    }
}

function Breach({ breachForm }) {
    const [image, setImage] = useState('')
    const imageRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!breachForm.image) return;
        const img = new Image();
        img.onload = () => setImage(img);
        img.src = breachForm.image;
    }, [breachForm.image])

    const openedBreachImageStyle = (top, left, additional = {}) => ({
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        transform: "translate(-50%, -50%)",
        ...additional
    })

    const containerStyle = (top, left) => ({
        position: 'absolute',
        top: `${top}%`,
        left: `${left}%`,
        transform: 'translate(-50%, -50%)',
        aspectRatio: '1 / 1',
        overflow: 'hidden'
    })

    const breachFileName = `breach-${breachForm.state}`

    const breach = () => {
        if (!breachForm.image || breachForm.state === "no") {
            return (<img src={`${process.env.PUBLIC_URL}/mages/${breachFileName}.png`} style={openedBreachImageStyle(breachForm.top || 6.5, breachForm.left || getBreachLeft(breachForm.number))} width="4%" />)
        }

        const rect = containerRef?.current?.getBoundingClientRect()
        if (breachForm.state === "open") {
            return (
                <div ref={containerRef} style={{width: "4%", ...containerStyle(breachForm.top, breachForm.left), borderRadius: '50%'}}>
                    <VortexImage image={image} imageRef={imageRef} top={0} left={0} swirl={+breachForm.swirl} x={+breachForm.x} y={+breachForm.y} maxHeight={rect?.height || 10} maxWidth={rect?.width || 10} />
                </div>
            )
        } else {
            return (
                <div ref={containerRef} style={{width: "4%", ...containerStyle(breachForm.top, breachForm.left)}}>
                    <img src="https://petapixel.com/assets/uploads/2024/01/The-Star-of-System-Sol-Rectangle-640x800.jpg" style={{width: rect?.width || 10, height: rect?.height || 10}} />
                    <VortexImage image={image} imageRef={imageRef} top={0} left={0} swirl={+breachForm.swirl} x={+breachForm.x} y={+breachForm.y} maxHeight={rect?.height || 100} maxWidth={rect?.width || 100} />
                    <img src={`${process.env.PUBLIC_URL}/mages/${breachFileName}-custom.png`} style={{position: 'absolute', top: 0, left: 0}} width={rect?.width || 100} height={rect?.height || 100} />
                </div>
            )
        }
    }

    return breach()
}

const createBreachForm = (form, breachNumber) => {
    const keyName = `breach${breachNumber}`

    return {
        number: breachNumber,
        state: form[`${keyName}`],
        top: form[`${keyName}Top`],
        left: form[`${keyName}Left`],
        image: form[`${keyName}ImageUrl`] ?? `${process.env.PUBLIC_URL}/default_art.png`,
        swirl: form[`${keyName}Swirl`],
        x: form[`${keyName}X`],
        y: form[`${keyName}Y`]
    }
}


function MageCard({ charges, form, ref }) {

    const cardWrapperStyle = {
        position: "relative",
        width: "100%",
        maxWidth: "1200px",     // optional cap
        aspectRatio: "512 / 365",  // 🔥 key part
        margin: "0",
        // zIndex: -2,
        background: 'black',
        overflow: 'hidden'
    };

    const imageStyle = {
        width: "100%",
        height: "100%",
        aspectRatio: "49/37",
        objectFit: 'cover'
    };

    const textStyle = (top, left, fontSize, additional = {}) => ({
        position: "absolute",
        textAlign: "center",
        width: "40%",
        maxWidth: "40%",
        top: `${top}%`,
        left: `${left}%`,
        transform: "translate(-50%, -50%)",
        fontSize,
        color: "white",
        fontFamily: 'kefa',
        ...additional
    })

    const innerImageStyle = (top, left, scaleValue = 0, additional = {}) => {
        const scale = 1 + scaleValue / 100;
        return {
            position: "absolute",
            top: `${top}%`,
            left: `${left}%`,
            transform: `scale(${scale})`,
            ...additional,
        }
    }

    const backgroundImageStyle = (top, left, scaleValue = 0, additional = {}) => {
        const scale = 1 + scaleValue / 100;
        return {
            position: "absolute",
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            objectFit: 'cover',
            maxWidth: 'none',
            width: "auto",
            height: "auto",
            ...additional,
        }
    }

    const textStyleGold = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'gold', ...additional })
    const textStyleStarting = (top, left, fontSize, additional) => textStyle(top, left, fontSize, additional)

    const customBackgroundStyle = (additional) => ({...additional})

    const backgroundFront = () => {
        if (!form.customBackground) {
            return (
                <>
                    <img src={`${process.env.PUBLIC_URL}/mages/${charges} charge mage.png`} style={imageStyle}/>
                </>
            )
        }
        return (
            <>
                <img src={form.customBackground} style={{...backgroundImageStyle(form.customBackgroundTop || 50, form.customBackgroundLeft || 50, form.customBackgroundScale || 0), ...customBackgroundStyle(sanitizeCustomStyle(form.customBackgroundCustomStyle))}}/>
                <img src={`${process.env.PUBLIC_URL}/mages/empty-layout-${charges}-charges.png`} style={{...imageStyle, position: 'absolute', top: 0, left: 0, objectFit: 'fill'}} />
            </>
        )
    }

    const backgroundBack = () => {
        if (!form.customBackground) {
            return (
                <img src={`${process.env.PUBLIC_URL}/mages/mage-back.png`} style={imageStyle}/>
            )
        }
        return (
            <>
                <img src={form.customBackground} style={{...backgroundImageStyle(form.customBackgroundTop || 50, form.customBackgroundLeft || 50, form.customBackgroundScale || 0), ...customBackgroundStyle(sanitizeCustomStyle(form.customBackgroundCustomStyle))}}/>
            </>
        )
    }

    const breach = (breachNumber) => {
        const breachForm = createBreachForm(form, breachNumber)
        return <Breach breachForm={breachForm}/>
    }

    return (
        <div ref={ref}>
            {/*front*/}
            <div style={cardWrapperStyle}>
                {backgroundFront()}
                {
                    [...Array(4).keys()].map(it => breach(it))
                }
                <div style={textStyle(form.nameTop || 12, form.nameLeft || 71, form.nameFontSize || "1.5vw", {fontWeight: 'bold', ...sanitizeCustomStyle(form.nameCustomStyle || {})})}>{enrichText(form.name || '')}</div>
                <div style={textStyleGold(form.titleTop || 17, form.titleLeft || 71, form.titleFontSize || "1.5vw", {fontWeight: 'bold', whiteSpace: 'nowrap', ...sanitizeCustomStyle(form.titleCustomStyle || {})})}>{enrichText(form.title || '')}</div>
                <div style={textStyleStarting(form.handTop || 42.5, form.handLeft || 71, form.handFontSize || "0.75vw", {whiteSpace: 'nowrap', ...sanitizeCustomStyle(form.handCustomStyle || {})})}>{enrichText(form.startingHand || '')}</div>
                <div style={textStyleStarting(form.deckTop || 49, form.deckLeft || 71, form.deckFontSize || "0.75vw", {whiteSpace: 'nowrap', ...sanitizeCustomStyle(form.deckCustomStyle || {})})}>{enrichText(form.startingDeck || '')}</div>
                <div style={textStyleGold(form.abilityNameTop || 54, form.abilityNameLeft || 71, form.abilityNameFontSize || "1.5vw", { fontWeight: 'bold', whiteSpace: 'nowrap', ...sanitizeCustomStyle(form.abilityNameCustomStyle || {}) })}>{enrichText(form.abilityName || '')}</div>
                <div style={textStyle(form.abilityUsageTop || 59, form.abilityUsageLeft || 71, form.abilityUsageFontSize || "clamp(12px, 100%, 18px)", {fontWeight: "bold", whiteSpace: 'nowrap', ...sanitizeCustomStyle(form.abilityUsageCustomStyle || {})})}>{enrichText(form.abilityUsage || '')}</div>
                <div style={textStyle(form.abilityDescTop || 73, form.abilityDescLeft || 71, form.abilityDescFontSize || "clamp(12px, 100%, 18px)", {...sanitizeCustomStyle(form.abilityDescCustomStyle || {})})}>{enrichText(form.abilityDesc || '')}</div>
                
                <img style={{...innerImageStyle(form.artTop || 60, form.artLeft || 23, form.artScale || 0), ...sanitizeCustomStyle(form.artCustomStyle)}} width={form.artWidth} src={form.artImageUrl} />
                
                <div style={textStyle(form.additionalRulesTop || 80, form.additionalRulesLeft || 20, form.additionalRulesFontSize || "clamp(12px, 100%, 18px)", {...sanitizeCustomStyle(form.additionalRulesCustomStyle)})}>{enrichText(form.additionalRules || '')}</div>
                <div style={textStyle(form.creditsTop || 96, form.creditsLeft || 5, form.creditsFontSize || "12px", {...sanitizeCustomStyle(form.creditsCustomStyle)})}>{enrichText(form.credits || '')}</div>
            </div>

            <div style={{marginTop: '48px'}}></div>

            {/*back*/}
            <div style={cardWrapperStyle}>
                {backgroundBack()}
                <img style={{...innerImageStyle(form.artTop || 60, form.artLeft || 23, form.artScale || 0), ...sanitizeCustomStyle(form.artCustomStyle)}} width={form.artWidth} src={form.artImageUrl} />
                <div style={textStyle(form.loreTop || 59, form.loreLeft || 71, form.loreFontSize || "clamp(12px, 100%, 18px)", {...sanitizeCustomStyle(form.loreCustomStyle)})}>{enrichText(form.lore || '')}</div>
            </div>
        </div>
    )
}

function MageForm({
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
        e.stopPropagation()
        e.preventDefault()
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit?.(form);
    }

    const breachOption = (breach) => (
        <div className="form-row">
            <label>{`Breach ${breach}`}</label>
            <select
                name={`breach${breach}`}
                id={`breach${breach}`}
                value={form[`breach${breach}`]}
                onChange={handleChange}
            >
                <option value="open">Opened</option>
                <option value="no">No Breach</option>
                <option value="top">Top</option>
                <option value="left">Left</option>
                <option value="bottom">Bottom</option>
                <option value="right">Right</option>
            </select>
        </div>
    )

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

    const mageTitle = () => {
        const input = (<div className="form-row">
                <label>Title</label>
                <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Knower of The Unknown"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"title"} topPlaceholder={"17"} leftPlaceholder={"71"} form={form} handleChange={handleChange} />
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

    const startingHand = () => {
        const input = (<div className="form-row">
                <label>Starting Hand</label>
                <input
                name="startingHand"
                value={form.startingHand}
                onChange={handleChange}
                placeholder="1x Nameless Knowledge, 3x Crystal, 1x Spark"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"hand"} topPlaceholder={"42.5"} leftPlaceholder={"71"} form={form} handleChange={handleChange} />
        )
    }

    const startingDeck = () => {
        const input = (<div className="form-row">
                <label>Starting Deck</label>
                <input
                name="startingDeck"
                value={form.startingDeck}
                onChange={handleChange}
                placeholder="4x Crystal, 1x Spark"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"deck"} topPlaceholder={"49"} leftPlaceholder={"71"} form={form} handleChange={handleChange} />
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

    const abilityUsage = () => {
        const input = (<div className="form-row">
                <label>Ability Usage</label>
                <input
                name="abilityUsage"
                value={form.abilityUsage}
                onChange={handleChange}
                placeholder="Activate During Your Main Phase"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"abilityUsage"} topPlaceholder={"54"} leftPlaceholder={"71"} form={form} handleChange={handleChange} />
        )
    }

    const abilityDesc = () => {
        const input = (<div className="form-row">
                <label>Ability Description</label>
                <textarea
                maxLength={form.abilityDescCharLimit || "2000"}
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
            <AdvancedSettingsComponent input={input} name={"additionalRules"} topPlaceholder={"80"} leftPlaceholder={"20"} form={form} handleChange={handleChange} />
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
            <AdvancedSettingsComponent input={input} name={"lore"} topPlaceholder={"80"} leftPlaceholder={"20"} form={form} handleChange={handleChange} />
        )
    }

    const breaches = () => {
        const input = (
            <div className="form-grid-4">
                {[...Array(4).keys()].map(it => breachOption(it))}
            </div>
        )

        return (
            <div className="form-grid-4">
                {
                    [...Array(4).keys()].map(it => (
                        <AdvancedSettingsComponent type={"breach"} input={breachOption(it)} name={`breach${it}`} topPlaceholder={"73"} leftPlaceholder={"71"} form={form} handleChange={handleChange} handleFileUpload={handleFileChange} />
                    ))
                }
            </div>
        )
    }

    const customBackground = () => {
        const input = (
            <div>
                <div className="form-grid-image">
                    <div className="form-row">
                        <label>Custom Background</label>
                        <input
                        type="file"
                        name="customBackground"
                        onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-row" style={{marginTop: 'calc(0.9rem + 12px)'}}>
                        <div className="secondary-btn" onClick={() => handleChange({target: {name: "customBackground", value: null}})}>
                            Reset Background
                        </div>
                    </div>

                </div>
            </div>
        )

        return (
            <AdvancedSettingsComponent input={input} name={"customBackground"} type={"customBackground"} form={form} handleChange={handleChange} />
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
            
            {breaches()}
            
            {mageName()}

            {mageTitle()}

            {mageArt()}

            {startingHand()}

            {startingDeck()}

            {abilityName()}

            {abilityUsage()}

            {abilityDesc()}

            {additionalRules()}

            {lore()}

            {customBackground()}
            {credits()}
        </form>
    )
}