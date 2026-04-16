import {useState, useEffect} from 'react';
import useCreator from '../common/useCreator';
import useImageUpload from '../common/useImageUpload';
import enrichText from '../common/enriches'
import { useLocalStorage } from "@uidotdev/usehooks";
import AdvancedSettingsComponent from '../common/advancedSettingsComponents';
import DataHandler from '../components/DataHandler';
import sanitizeCustomStyle from '../common/sanitize';
import Tooltip from '../components/Tooltip';

export default function Supply() {
    const [cardForm, saveCardForm] = useLocalStorage("supplyCard", {})
    const { form, setForm, captureRef, handleCapture, importForm, importRef, exportForm } = useCreator({
        name: 'Power of friendship',
        text: 'When prepared, no ally can be exhausted and Gravehold cannot be destroyed (always on 1 health)',
        cast: 'Win the fight',
        lore: 'This is bullshit ~ Nemesis',
        cost: 0,
        artImageUrl: `${process.env.PUBLIC_URL}/default_art.png`,
        ...cardForm
    });
    const [cardType, setCardType] = useState('spell');
    const [isRandomizer, setIsRandomizer] = useState(false)
    const [isTreasure, setIsTreasure] = useState(false)
    const [isCursed, setIsCursed] = useState(false)

    const handleSetForm = (form) => {
        setForm(form)
        saveCardForm(form)
    }

    return (
        <div>
            <h1>Supply Card Creation</h1>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: "16px"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "50em"}}>
                    <div style={{flexGrow: '3', display: 'flex', width: '80%'}}>
                        <div className={cardType === 'spell' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('spell')}>Spell</div>
                        <div className={cardType === 'gem' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('gem')}>Gem</div>
                        <div className={cardType == 'relic' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('relic')}>Relic</div>
                    </div>
                    <div style={{flexGrow: '1', marginTop: '-1.5%'}}>
                        <label className="switch-wrapper">
                            <input
                                type="checkbox"
                                className="switch-input"
                                checked={isRandomizer}
                                onChange={() => setIsRandomizer(!isRandomizer)}
                            />
                            <span className="switch"></span>
                            <span className="switch-text" style={{textWrap: 'nowrap'}}>Randomizer</span>
                        </label>
                    </div>
                    <div style={{flexGrow: '1', marginTop: '-1.5%', marginLeft: '2%'}}>
                        <label className="switch-wrapper">
                            <input
                                type="checkbox"
                                className="switch-input"
                                checked={isTreasure}
                                onChange={() => setIsTreasure(!isTreasure)}
                            />
                            <span className="switch"></span>
                            <span className="switch-text" style={{textWrap: 'nowrap'}}>Treasure</span>
                        </label>
                    </div>
                    <div style={{flexGrow: '1', marginTop: '-1.5%', marginLeft: '2%'}}>
                        <label className="switch-wrapper">
                            <input
                                type="checkbox"
                                className="switch-input"
                                checked={isCursed}
                                onChange={() => setIsCursed(!isCursed)}
                            />
                            <span className="switch"></span>
                            <span className="switch-text" style={{textWrap: 'nowrap'}}>Cursed</span>
                        </label>
                    </div>
                </div>
                <DataHandler handleCapture={handleCapture} importRef={importRef} importForm={importForm} exportForm={exportForm} />
            </div>

            <div style={{display: "flex", flexDirection: "row", gap: "2em"}}>
                <div style={{ flex: "0 0 60%" }}>
                    <SupplyCard cardType={cardType} isRandomizer={isRandomizer} isTreasure={isTreasure} form={form} ref={captureRef} isCursed={isCursed} />
                </div>

                <div style={{ flex: "1" }}>
                    <SupplyForm cardType={cardType} form={form} onSubmit={handleSetForm} isCursed={isCursed} />
                </div>
            </div>
        </div>
    )
}

function SupplyCard({ cardType, isRandomizer, isTreasure, form, ref, isCursed }) {
    const cardWrapperStyle = {
        position: "relative",
        width: "50%",
        maxWidth: "1200px",
        margin: "0",
        border: isRandomizer ? '' : '2px solid white',
        overflow: 'hidden'
    };

    const imageStyle = {
        width: "100%",
        height: "100%",
        marginTop: isTreasure || isCursed ? "0%" : "70%"
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
            transform: `scale(${scale})`,
            objectFit: 'cover',
            filter: isTreasure ? 'sepia(80%)' : '',
            ...additional,
        }
    }

    const costStyle = (top, left, fontSize, additional = {}) => ({
        position: "absolute",
        transform: "translate(-100%)",
        top: `${top}%`,
        left: `${left}%`,
        width: "80%",
        fontSize,
        ...additional,
    })

    const textStyleBlack = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'black', ...additional })
    const textStyleWhite = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'white', ...additional })
    const textStyleLore = (top, left, fontSize, additional) => textStyle(top, left, fontSize, additional)

    const imagePath = isTreasure ? `${process.env.PUBLIC_URL}/supply/treasure1${cardType}.png` : isCursed ? `${process.env.PUBLIC_URL}/supply/${cardType}-cursed.png` : `${process.env.PUBLIC_URL}/supply/${cardType}.png`

    return (
        <div style={{...cardWrapperStyle}} ref={ref}>
            { isRandomizer && (<img src={`${process.env.PUBLIC_URL}/supply/randomizer.png`} style={innerImageStyle(0, 0, 0, {width: '100%', height: '100%'})} />)}
            <img style={{...innerImageStyle(form.artTop || 0, form.artLeft || 50, form.artScale || 0, {zIndex: -1}), ...sanitizeCustomStyle(form.artCustomStyle)}} src={form.artImageUrl} />
            <img src={imagePath} style={{...imageStyle}} />
            <div style={textStyleBlack(form.nameTop || 63, form.nameLeft || 50, form.nameFontSize || "1.7vw", {fontWeight: 'bold', whiteSpace: 'nowrap', ...sanitizeCustomStyle(form.nameCustomStyle)})}>{enrichText(form.name || '')}</div>
            <div style={textStyleBlack(form.textTop || 77, form.textLeft || 50, form.textFontSize || "1.3vw", {display: "flex", flexDirection: 'column', ...sanitizeCustomStyle(form.textCustomStyle)})}>
                <div>{enrichText(form.text || '')}</div>
                {cardType === 'spell' && <div><span style={{fontWeight: 'bold'}}>Cast: </span>{enrichText(form.cast || '')}</div>}
            </div>
            <div style={textStyleLore(form.loreTop || 96, form.loreLeft || 50, form.loreFontSize || "0.8vw", {...sanitizeCustomStyle(form.loreCustomStyle)})}>{enrichText(form.lore || '')}</div>
            <img style={costStyle(0, 100)} src={`${process.env.PUBLIC_URL}/supply/cost.png`}/>
            <div style={textStyleWhite(form.costTop || 6.5, form.costLeft || 91.5, form.costFontSize || "1.5vw", {...sanitizeCustomStyle(form.costCustomStyle)})}>{enrichText(form.cost || '')}</div>
            <div style={textStyle(form.creditsTop || 96, form.creditsLeft || 5, form.creditsFontSize || "12px", {...sanitizeCustomStyle(form.creditsCustomStyle)})}>{enrichText(form.credits || '')}</div>
            { isCursed && (<div style={textStyleBlack(form.curseTop || 94, form.curseLeft || 50, form.curseFontSize || "16px", {fontWeight: 'bold', ...sanitizeCustomStyle(form.curstCustomStyle)})}>{enrichText(form.curse || '')}</div>) }
            {
                form.durability && 
                <>
                    <img src={`${process.env.PUBLIC_URL}/supply/durability.png`} style={{position: 'absolute', top: '0', left: '0', width: '100%'}} />
                    <div style={textStyle(form.durabilityTop || 7, form.durabilityLeft || 10, form.fontSize || "2vw", { width: '8%', height: '6%'})}>
                        <span>{form.durability}</span>
                        <img src={`${process.env.PUBLIC_URL}/supply/durability_back.png`} style={{width: '150%', position: 'absolute', top: '0', left: '-25%', zIndex: -1}} />
                    </div>
                </>
            }
        </div>
    )
}

function SupplyForm({ cardType, isCursed, form, onSubmit }) {
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
                <label>Card Name</label>
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
            <AdvancedSettingsComponent input={input} name={"text"} topPlaceholder={"77"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }

    const spellCast = () => {
        const input = (<div className="form-row">
                <label>Spell Cast</label>
                <input
                name="cast"
                value={form.cast}
                onChange={handleChange}
                placeholder="Nameless Knowledge"
                />
            </div>)
        return input
    }

    const cardCost = () => {
        const input = (<div className="form-row">
                <label>Card Cost</label>
                <input
                type="number"
                name="cost"
                value={form.cost}
                onChange={handleChange}
                placeholder="0"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"cost"} topPlaceholder={"6.5"} leftPlaceholder={"91.5"} form={form} handleChange={handleChange} />
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
            <AdvancedSettingsComponent input={input} name={"art"} topPlaceholder={"0"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }

    const cardLore = () => {
        const input = (<div className="form-row">
                <label>Card Lore</label>
                <input
                name="lore"
                value={form.lore}
                onChange={handleChange}
                placeholder="Nameless Knowledge"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"lore"} topPlaceholder={"96"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }

    const curse = () => {
        const input = (<div className="form-row">
                <label>Curse Label</label>
                <input
                name="curse"
                value={form.curse}
                onChange={handleChange}
                placeholder="Base"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"curse"} topPlaceholder={"94"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
    }

    const durability = () => {
        const input = (<div className="form-row">
                <label>Durability</label>
                <input
                type="number"
                name="durability"
                value={form.durability}
                onChange={handleChange}
                placeholder="3"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"durability"} topPlaceholder={"5"} leftPlaceholder={"5"} form={form} handleChange={handleChange} />
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
            {cardName()}
            {cardText()}
            {cardType === 'spell' && spellCast()}
            {cardCost()}
            <div style={{display: 'flex', flexDirection: 'row', }}>
                {cardArt()}
                <Tooltip text='For treasures, sepia effect is created by filter. Include {"filter": ""} in custom CSS to remove the sepia.' />
            </div>
            {cardLore()}
            {credits()}
            {isCursed && curse()}
            {durability()}
        </form>
    )
}
