import {useEffect, useState} from 'react';
import Tooltip from '../components/Tooltip';
import useCreator from '../common/useCreator';
import useImageUpload from '../common/useImageUpload';
import advancedSettingsComponents from '../common/advancedSettingsComponents';
import enrichText from '../common/enriches'
import { useLocalStorage } from "@uidotdev/usehooks";

// TODO - lore page, additional rules, changes of the font sizes

export default function Mage() {

    const [charges, setCharges] = useState(5)

    const [mageForm, saveMageForm] = useLocalStorage("mage", {})

    const {form, setForm, captureRef, handleCapture} = useCreator({
        name: "Ganelon",
        title: "Knower of The Unknown",
        artImageUrl: "https://i.pinimg.com/1200x/05/e4/f5/05e4f5328d221bbddb6a10fb9523895b.jpg",
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
        nameTop: null,
        nameLeft: null,
        nameFontSize: null,
        titleTop: null,
        titleLeft: null,
        titleFontSize: null,
        artTop: null,
        artLeft: null,
        handTop: null,
        handLeft: null,
        handFontSize: null,
        deckTop: null,
        deckLeft: null,
        deckFontSize: null,
        abilityNameTop: null,
        abilityNameLeft: null,
        abilityNameFontSize: null,
        abilityUsageTop: null,
        abilityUsageLeft: null,
        abilityUsageFontSize: null,
        abilityDescTop: null,
        abilityDescLeft: null,
        abilityDescFontSize: null,
        abilityDescCharLimit: null,
        breach0Top: null,
        breach0Left: null,
        breach1Top: null,
        breach1Left: null,
        breach2Top: null,
        breach2Left: null,
        breach3Top: null,
        breach3Left: null,
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
                <div>
                    <div className="primary-btn" onClick={() => handleCapture()}>Ready!</div>
                </div>
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

function MageCard({ charges, form, ref }) {

    const cardWrapperStyle = {
        position: "relative",
        width: "100%",
        maxWidth: "1200px",     // optional cap
        // aspectRatio: "16 / 9",  // 🔥 key part
        margin: "0",
    };

    const imageStyle = {
        width: "100%",
        height: "100%",
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

    const innerImageStyle = (top, left, additional = {}) => ({
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        transform: "translate(-50%, -50%)",
    })

    const textStyleGold = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'gold', ...additional })
    const textStyleStarting = (top, left, fontSize) => textStyle(top, left, fontSize)

    return (
        <div style={cardWrapperStyle} ref={ref}>
            <img src={`${process.env.PUBLIC_URL}/mages/${charges} charge mage.png`} style={imageStyle}/>
            <img src={`${process.env.PUBLIC_URL}/mages/breach-${form.breach0}.png`} style={innerImageStyle(form.breach0Top || 6.5, form.breach0Left || 7)} width="4%" />
            <img src={`${process.env.PUBLIC_URL}/mages/breach-${form.breach1}.png`} style={innerImageStyle(form.breach1Top || 6.5, form.breach1Left || 30)} width="4%" />
            <img src={`${process.env.PUBLIC_URL}/mages/breach-${form.breach2}.png`} style={innerImageStyle(form.breach2Top || 6.5, form.breach2Left || 72)} width="4%" />
            <img src={`${process.env.PUBLIC_URL}/mages/breach-${form.breach3}.png`} style={innerImageStyle(form.breach3Top || 6.5, form.breach3Left || 97)} width="4%" />
            <div style={textStyle(form.nameTop || 12, form.nameLeft || 71, form.nameFontSize || "1.5vw", {fontWeight: 'bold'})}>{enrichText(form.name || '')}</div>
            <div style={textStyleGold(form.titleTop || 17, form.titleLeft || 71, form.titleFontSize || "1.5vw", {fontWeight: 'bold', whiteSpace: 'nowrap'})}>{enrichText(form.title || '')}</div>
            <div style={textStyleStarting(form.handTop || 42.5, form.handLeft || 71, form.handFontSize || "0.75vw", {whiteSpace: 'nowrap'})}>{enrichText(form.startingHand || '')}</div>
            <div style={textStyleStarting(form.deckTop || 49, form.deckLeft || 71, form.deckFontSize || "0.75vw", {whiteSpace: 'nowrap'})}>{enrichText(form.startingDeck || '')}</div>
            <div style={textStyleGold(form.abilityNameTop || 54, form.abilityNameLeft || 71, form.abilityNameFontSize || "1.5vw", { fontWeight: 'bold', whiteSpace: 'nowrap' })}>{enrichText(form.abilityName || '')}</div>
            <div style={textStyle(form.abilityUsageTop || 59, form.abilityUsageLeft || 71, form.abilityUsageFontSize || "clamp(12px, 100%, 18px)", {fontWeight: "bold", whiteSpace: 'nowrap'})}>{enrichText(form.abilityUsage || '')}</div>
            <div style={textStyle(form.abilityDescTop || 73, form.abilityDescLeft || 71, form.abilityDescFontSize || "clamp(12px, 100%, 18px)", {})}>{enrichText(form.abilityDesc || '')}</div>
            <img style={innerImageStyle(form.artTop || 60, form.artLeft || 23)} width={form.artWidth} src={form.artImageUrl} />
        </div>
    )
}

function MageForm({
    form,
    onSubmit
}) {

    const [advancedSettings, toggleAdvancedSettings] = useState(false)

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
        console.log(name, value)
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
        if (advancedSettings) {
            return (
                <div className='form-grid-4'>
                    {input}
                    {advancedSettingsComponents("name", "12", "71", form, handleChange)}
                </div>
            )
        }
        return input
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
        if (advancedSettings) {
            return (
                <div className='form-grid-4'>
                    {input}
                    {advancedSettingsComponents("title", "17", "71", form, handleChange)}
                </div>
            )
        }
        return input
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

        if (advancedSettings) {
            return (
                <div className='form-grid-4'>
                    {input}
                    {advancedSettingsComponents("art", "60", "23", form, handleChange)}
                </div>
            )
        }
        return input
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
        if (advancedSettings) {
            return (
                <div className='form-grid-4'>
                    {input}
                    {advancedSettingsComponents("hand", "42.5", "71", form, handleChange)}
                </div>
            )
        }
        return input
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
        if (advancedSettings) {
            return (
                <div className='form-grid-4'>
                    {input}
                    {advancedSettingsComponents("deck", "49", "71", form, handleChange)}
                </div>
            )
        }
        return input
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
        if (advancedSettings) {
            return (
                <div className='form-grid-5'>
                    {input}
                    {advancedSettingsComponents("abilityName", "54", "71", form, handleChange)}
                </div>
            )
        }
        return input
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
        if (advancedSettings) {
            return (
                <div className='form-grid-4'>
                    {input}
                    {advancedSettingsComponents("abilityUsage", "54", "71", form, handleChange)}
                </div>
            )
        }
        return input
    }

    const abilityDesc = () => {
        const input = (<div className="form-row">
                <label>Ability Description</label>
                <textarea
                maxLength={form.abilityDescCharLimit || "200"}
                name="abilityDesc"
                value={form.abilityDesc}
                onChange={handleChange}
                rows={4}
                />
            </div>)
        if (advancedSettings) {
            return (
                <div className='form-grid-5'>
                    {input}
                    {advancedSettingsComponents("abilityDesc", "73", "71", form, handleChange)}
                    <div className="form-row">
                        <label>Character Limit</label>
                        <input
                            type="number"
                            name="abilityDescCharLimit"
                            value={form.abilityDescCharLimit}
                            onChange={handleChange}
                            placeholder="200"
                        />
                    </div>
                </div>
            )
        }
        return input
    }

    const breaches = () => {
        const input = (
            <div className="form-grid-4">
                {[...Array(4).keys()].map(it => breachOption(it))}
            </div>
        )

        if (advancedSettings) {
            return (
                <div style={{display: "flex", flexDirection: "column"}}>
                    {input}
                    <div className="form-grid-4">
                        {
                            [...Array(4).keys()].map(it => (
                                <div style={{width: "90%"}}>
                                    <div className="form-row">
                                        <label>Top</label>
                                        <input
                                        type="number"
                                        name={`breach${it}Top`}
                                        value={form[`breach${it}Top`]}
                                        onChange={handleChange}
                                        placeholder="73"
                                        />
                                    </div>
                                    <div className="form-row">
                                        <label>Left</label>
                                        <input
                                        type="number"
                                        name={`breach${it}Left`}
                                        value={form[`breach${it}Left`]}
                                        onChange={handleChange}
                                        placeholder="71"
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }

        return input
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

            <div class="switch-wrapper">
                <input type="checkbox" id="advancedSwitch" class="switch-input" onClick={() => toggleAdvancedSettings(!advancedSettings)} />
                <label for="advancedSwitch" class="switch" />
                <span class="switch-text">Advanced Settings</span>
            </div>
        </form>
    )
}