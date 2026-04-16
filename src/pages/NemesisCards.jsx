import {useState, useEffect} from 'react';
import useCreator from '../common/useCreator';
import useImageUpload from '../common/useImageUpload';
import enrichText from '../common/enriches'
import { useLocalStorage } from "@uidotdev/usehooks";
import DataHandler from '../components/DataHandler';
import sanitizeCustomStyle from '../common/sanitize';

import AdvancedSettingsComponent from '../common/advancedSettingsComponents';

const isMinion = (cardType) => cardType === 'minion'

export default function NemesisCards() {
    const [cardForm, saveCardForm] = useLocalStorage("nemesisCard", {})
    const { form, setForm, captureRef, handleCapture, importForm, importRef, exportForm } = useCreator({
        name: 'Power of friendship',
        text: 'When prepared, no ally can be exhausted and Gravehold cannot be destroyed (always on 1 health)',
        cast: 'Win the fight',
        lore: 'This is bullshit ~ Nemesis',
        cost: 0,
        artImageUrl: `${process.env.PUBLIC_URL}/default_art.png`,
        backgroundArt: `${process.env.PUBLIC_URL}/default_art.png`,
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
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "50em"}}>
                    <div style={{flexGrow: '3'}}>
                        <div style={{display: 'flex', width: '80%'}}>
                            <div className={cardType === 'attack' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('attack')}>Attack</div>
                            <div className={cardType === 'power' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('power')}>Power</div>
                            <div className={cardType == 'minion' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('minion')}>Minion</div>
                        </div>
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
                <DataHandler handleCapture={handleCapture} importRef={importRef} importForm={importForm} exportForm={exportForm} />
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
        border: '5px solid white',
        overflow: 'hidden',
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
            transform: `scale(${scale})`,
            ...additional,
        }
    }

    const silhouetteStyle = () => ({
        opacity: 0.15,
        filter: "blur(1px)"
    })

    const textStyleBlack = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'black', ...additional })
    const textStyleWhite = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'white', ...additional })
    const textStyleLore = (top, left, fontSize, additional) => textStyle(top, left, fontSize, additional)

    const textColor = isMinion(cardType) ? 'black' : 'white' 

    const withShadow = (style) => ({
        textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000",
        ...style
    })

    return (
        <div style={cardWrapperStyle} ref={ref}>
            { isMinion(cardType) && <img style={{...innerImageStyle(form.artTop || 0, form.artLeft || 50, form.artScale || 0, {zIndex: -1}), ...sanitizeCustomStyle(form.artCustomStyle)}} src={form.artImageUrl} />}
            <img src={`${process.env.PUBLIC_URL}/nemesis-${isBase ? 'base' : 'upgrade'}/${cardType}.png`} style={imageStyle} />
            { !isMinion(cardType) && 
                <>
                    <img style={{...innerImageStyle(form.backgroundArtTop || 0, form.backgroundArtLeft || 50, form.backgroundArtScale || 0), ...silhouetteStyle(), ...sanitizeCustomStyle(form.backgroundArtCustomStyle)}} src={form.backgroundArt} /> 
                    <div style={{...innerImageStyle(form.backgroundArtTop || 0, form.backgroundArtLeft || 50, form.backgroundArtScale || 0), background: "radial-gradient(circle at center, transparent 60%, #e8d98a 100%)"}} />
                </>
            }
            <div style={textStyle(form.nameTop || (isMinion(cardType) ? 65 : 12.5), form.nameLeft || 50, form.nameFontSize || "1.7vw", {fontWeight: 'bold', whiteSpace: 'nowrap', color: textColor, ...sanitizeCustomStyle(form.nameCustomStyle)})}>{enrichText(form.name || '')}</div>
            <div style={textStyleBlack(form.textTop || (isMinion(cardType) ? 77 : 55), form.textLeft || 50, form.textFontSize || "1.3vw", {...sanitizeCustomStyle(form.textCustomStyle)})}>
                {enrichText(form.text || '')}
            </div>
            {isMinion(cardType) && <div style={textStyle(form.minionHPTop || 55.5, form.minionHPLeft || 91.5, form.minionHPFontSize || "2vw", {fontWeight: 'bold', ...sanitizeCustomStyle(form.minionHPCustomStyle)})}>{form.minionHP}</div>}
            {
                isMinion(cardType) && (form.shieldTokens || 0) > 0 && (
                    <div style={innerImageStyle(form.shieldTokensTop || 51, form.shieldTokensLeft || 2, 0)}>
                        <img src={`${process.env.PUBLIC_URL}/symbols/shield-token.webp`} style={{width: '30%'}} />
                        <div style={withShadow(textStyleWhite(50, 15, form.shieldTokensFontSize || "2vw", {...sanitizeCustomStyle(form.shieldTokensCustomStyle)}))}>{form.shieldTokens}</div>
                    </div>
                )
            }
            <div style={textStyleBlack(form.nemesisNameTop || 94.2, form.nemesisNameLeft || 50, form.nemesisNameFontSize || "1vw", {fontWeight: 'bold', ...sanitizeCustomStyle(form.nemesisNameCustomStyle)})}>{enrichText(form.nemesisName || '')}</div>
            <div style={textStyleBlack(form.tierTop || 95.2, form.tierLeft || 95, form.tierFontSize || "0.9vw", {fontWeight: 'bold', ...sanitizeCustomStyle(form.tierCustomStyle)})}>{enrichText(form.tier || '')}</div>
            <div style={textStyleLore(form.loreTop || 98.5, form.loreLeft || 50, form.loreFontSize || "0.6vw", {...sanitizeCustomStyle(form.loreCustomStyle)})}>{enrichText(form.lore || '')}</div>
            <div style={textStyle(form.creditsTop || 96, form.creditsLeft || 5, form.creditsFontSize || "12px", {...sanitizeCustomStyle(form.creditsCustomStyle)})}>{enrichText(form.credits || '')}</div>
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
        return (
            <AdvancedSettingsComponent input={input} name={"name"} topPlaceholder={(isMinion(cardType) ? "65" : "12.5")} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
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
            <AdvancedSettingsComponent input={input} name={"text"} topPlaceholder={(isMinion(cardType) ? "77" : "55")} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
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
        return (
            <AdvancedSettingsComponent input={input} name={"nemesisName"} topPlaceholder={"94.2"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
        )
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
        return (
            <AdvancedSettingsComponent input={input} name={"tier"} topPlaceholder={"95.2"} leftPlaceholder={"95"} form={form} handleChange={handleChange} />
        )
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
        return (
            <AdvancedSettingsComponent input={input} name={"minionHP"} topPlaceholder={"55.5"} leftPlaceholder={"91.5"} form={form} handleChange={handleChange} />
        )
    }

    const shieldTokens = () => {
        const input = (<div className="form-row">
                <label>Shield Tokens</label>
                <input
                name="shieldTokens"
                value={form.shieldTokens}
                onChange={handleChange}
                placeholder="1"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"shieldTokens"} topPlaceholder={"55.5"} leftPlaceholder={"91.5"} form={form} handleChange={handleChange} />
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
            <AdvancedSettingsComponent input={input} name={"lore"} topPlaceholder={"98.5"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
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

    const backgroundArt = () => {
        const input = (
            <div>
                <div className="form-row">
                    <label>BackgroundArt</label>
                    <input
                    type="file"
                    name="backgroundArt"
                    onChange={handleFileChange}
                    />
                </div>
            </div>
        )

        return (
            <AdvancedSettingsComponent input={input} name={"backgroundArt"} topPlaceholder={"0"} leftPlaceholder={"50"} form={form} handleChange={handleChange} showFontSize={false} />
        )
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
            {isMinion(cardType) && shieldTokens()}
            {credits()}
            {!isMinion(cardType) && backgroundArt()}
        </form>
    )
}
