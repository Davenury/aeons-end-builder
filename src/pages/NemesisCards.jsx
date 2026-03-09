import {useState, useEffect} from 'react';
import useCreator from '../common/useCreator';
import useImageUpload from '../common/useImageUpload';
import enrichText from '../common/enriches'
import { useLocalStorage } from "@uidotdev/usehooks";
import advancedSettingsComponents from '../common/advancedSettingsComponents';

const isMinion = (cardType) => cardType === 'minion'

export default function NemesisCards() {
    const [cardForm, saveCardForm] = useLocalStorage("nemesisCard", {})
    const { form, setForm, captureRef, handleCapture } = useCreator({
        name: 'Power of friendship',
        text: 'When prepared, no ally can be exhausted and Gravehold cannot be destroyed (always on 1 health)',
        cast: 'Win the fight',
        lore: 'This is bullshit ~ Nemesis',
        cost: 0,
        artImageUrl: 'https://m.media-amazon.com/images/I/81luD-FbWEL._AC_UF1000,1000_QL80_.jpg',
        nemesisName: 'Ganelon',
        tier: '1',
        minionHP: 1,
        ...cardForm
    });
    const [cardType, setCardType] = useState('attack');
    const [isBase, setIsBase] = useState('true');

    const handleSetForm = (form) => {
        setForm(form)
        saveCardForm(form)
    }

    return (
        <div>
            <h1>Nemesis Card Creation</h1>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: "16px"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "40em"}}>
                    <div style={{flexGrow: '3'}}>
                        <div className={cardType === 'attack' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('attack')}>Attack</div>
                        <div className={cardType === 'power' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('power')}>Power</div>
                        <div className={cardType == 'minion' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('minion')}>Minion</div>
                    </div>
                    <div style={{flexGrow: '1', marginTop: '-1.5%'}}>
                        <label className="switch-wrapper">
                            <input
                                type="checkbox"
                                className="switch-input"
                                checked={!isBase}
                                onChange={() => setIsBase(!isBase)}
                            />
                            <span className="switch"></span>
                            <span className="switch-text" style={{textWrap: 'nowrap'}}>Upgrade Card</span>
                        </label>
                    </div>
                </div>
                <div>
                    <div className="primary-btn" onClick={() => handleCapture()}>Ready!</div>
                </div>
            </div>

            <div style={{display: "flex", flexDirection: "row", gap: "2em"}}>
                <div style={{ flex: "0 0 60%" }}>
                    <NemesisCard cardType={cardType} form={form} ref={captureRef} isBase={isBase} />
                </div>

                <div style={{ flex: "1" }}>
                    <NemesisForm cardType={cardType} form={form} onSubmit={handleSetForm} />
                </div>
            </div>
        </div>
    )
}

function NemesisCard({ cardType, form, ref, isBase }) {
    const cardWrapperStyle = {
        position: "relative",
        width: "50%",
        maxWidth: "1200px",
        margin: "0",
        border: '5px solid white'
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

    const innerImageStyle = (top, left, additional = {}) => ({
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        transform: "translate(-50%)",
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...additional,
    })

    const textStyleBlack = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'black', ...additional })
    const textStyleWhite = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'white', ...additional })
    const textStyleLore = (top, left, fontSize) => textStyle(top, left, fontSize, {})

    const textColor = isMinion(cardType) ? 'black' : 'white' 

    return (
        <div style={cardWrapperStyle} ref={ref}>
            { isMinion(cardType) && <img style={innerImageStyle(form.artTop || 0, form.artLeft || 50, {zIndex: -1})} src={form.artImageUrl} />}
            <img src={`${process.env.PUBLIC_URL}/nemesis-${isBase ? 'base' : 'upgrade'}/${cardType}.png`} style={imageStyle} />
            <div style={textStyle(form.nameTop || (isMinion(cardType) ? 65 : 12.5), form.nameLeft || 50, form.nameFontSize || "1.7vw", {fontWeight: 'bold', whiteSpace: 'nowrap', color: textColor})}>{enrichText(form.name || '')}</div>
            <div style={textStyleBlack(form.textTop || (isMinion(cardType) ? 77 : 55), form.textLeft || 50, form.textFontSize || "1.3vw")}>
                {enrichText(form.text || '')}
            </div>
            <div style={textStyle(form.minionHPTop || 55.5, form.minionHPLeft || 91.5, form.minionHPFontSize || "2vw", {fontWeight: 'bold'})}>{form.minionHP}</div>
            <div style={textStyleBlack(form.nemesisNameTop || 94.2, form.nemesisNameLeft || 50, form.nemesisNameFontSize || "1vw", {fontWeight: 'bold'})}>{form.nemesisName}</div>
            <div style={textStyleBlack(form.tierTop || 95.2, form.tierLeft || 95, form.tierFontSize || "0.9vw", {fontWeight: 'bold'})}>{form.tier}</div>
            <div style={textStyleLore(form.loreTop || 98.5, form.loreLeft || 50, form.loreFontSize || "0.6vw")}>{form.lore}</div>
        </div>
    )
}

function NemesisForm({ cardType, form, onSubmit }) {
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
        if (advancedSettings) {
            return (
                <div className='form-grid-4'>
                    {input}
                    {advancedSettingsComponents("name", (isMinion(cardType) ? "65" : "12.5"), "50", form, handleChange)}
                </div>
            )
        }
        return input
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
        if (advancedSettings) {
            return (
                <div className='form-grid-4'>
                    {input}
                    {advancedSettingsComponents("text", (isMinion(cardType) ? "77" : "55"), "50", form, handleChange)}
                </div>
            )
        }
        return input
    }

    const nemesisName = () => {
        const input = (<div className="form-row">
                <label>Nemesis Name</label>
                <input
                name="nemesisName"
                value={form.nemesisName}
                onChange={handleChange}
                placeholder="Ganelon"
                />
            </div>)
        if (advancedSettings) {
            return (
                <div className='form-grid-4'>
                    {input}
                    {advancedSettingsComponents("nemesisName", "94.2", "50", form, handleChange)}
                </div>
            )
        }
        return input
    }

    const tier = () => {
        const input = (<div className="form-row">
                <label>Card Tier</label>
                <input
                name="tier"
                type="number"
                min="0"
                max="5"
                value={form.tier}
                onChange={handleChange}
                placeholder="1"
                />
            </div>)
        if (advancedSettings) {
            return (
                <div className='form-grid-4'>
                    {input}
                    {advancedSettingsComponents("tier", "95.2", "95", form, handleChange)}
                </div>
            )
        }
        return input
    }

    const minionHP = () => {
        const input = (<div className="form-row">
                <label>Minion HP</label>
                <input
                name="minionHP"
                value={form.minionHP}
                onChange={handleChange}
                placeholder="1"
                />
            </div>)
        if (advancedSettings) {
            return (
                <div className='form-grid-4'>
                    {input}
                    {advancedSettingsComponents("minionHP", "55.5", "91.5", form, handleChange)}
                </div>
            )
        }
        return input
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

        if (advancedSettings) {
            return (
                <div className='form-grid-3'>
                    {input}
                    {advancedSettingsComponents("art", "0", "50", form, handleChange)}
                </div>
            )
        }
        return input
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
        if (advancedSettings) {
            return (
                <div className='form-grid-4'>
                    {input}
                    {advancedSettingsComponents("lore", "98.5", "50", form, handleChange)}
                </div>
            )
        }
        return input
    }


    return (
        <form className="mage-form" onSubmit={handleSubmit} style={{width: "100%"}}>
            {cardName()}
            {cardText()}
            {nemesisName()}
            {tier()}
            {cardLore()}
            {isMinion(cardType) && cardArt()}
            {isMinion(cardType) && minionHP()}

            <div class="switch-wrapper">
                <input type="checkbox" id="advancedSwitch" class="switch-input" onClick={() => toggleAdvancedSettings(!advancedSettings)} />
                <label for="advancedSwitch" class="switch" />
                <span class="switch-text">Advanced Settings</span>
            </div>
        </form>
    )
}
