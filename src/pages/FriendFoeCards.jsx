import {useState, useEffect} from 'react';
import useCreator from '../common/useCreator';
import useImageUpload from '../common/useImageUpload';
import enrichText from '../common/enriches'
import { useLocalStorage } from "@uidotdev/usehooks";
import AdvancedSettingsComponent from '../common/advancedSettingsComponents';
import DataHandler from '../components/DataHandler';

export default function FriendFoeCards() {
    const [cardForm, saveCardForm] = useLocalStorage("friendCard", {})
    const { form, setForm, captureRef, handleCapture, importForm, importRef, exportForm } = useCreator({
        name: 'Power of friendship',
        text: 'When prepared, no ally can be exhausted and Gravehold cannot be destroyed (always on 1 health)',
        cast: 'Win the fight',
        lore: 'This is bullshit ~ Nemesis',
        cost: 0,
        artImageUrl: 'https://m.media-amazon.com/images/I/81luD-FbWEL._AC_UF1000,1000_QL80_.jpg',
        ...cardForm
    });
    const [cardType, setCardType] = useState('boon');

    const handleSetForm = (form) => {
        setForm(form)
        saveCardForm(form)
    }

    return (
        <div>
            <h1>Friends and Foes Card Creation</h1>
            <h3>For Power and Minion cards, go to Nemesis Cards, since they look the same</h3>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: "16px"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "30em"}}>
                    <div className={cardType === 'boon' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('boon')}>Boon</div>
                    <div className={cardType === 'foe-attack' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('foe-attack')}>Foe Attack</div>
                    <div className={cardType == 'friend-attack' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('friend-attack')}>Friend Attack</div>
                </div>
                <DataHandler handleCapture={handleCapture} importRef={importRef} importForm={importForm} exportForm={exportForm} />
            </div>

            <div style={{display: "flex", flexDirection: "row", gap: "2em"}}>
                <div style={{ flex: "0 0 60%" }}>
                    <FriendFoeCard cardType={cardType} form={form} ref={captureRef} />
                </div>

                <div style={{ flex: "1" }}>
                    <FriendFoeForm cardType={cardType} form={form} onSubmit={handleSetForm} />
                </div>
            </div>
        </div>
    )
}

function FriendFoeCard({ cardType, form, ref }) {
    const cardWrapperStyle = {
        position: "relative",
        width: "50%",
        maxWidth: "1200px",
        margin: "0",
        border: '5px solid white',
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
            transform: `scale(${scale})`,
            objectFit: 'cover',
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

    const withShadow = (style) => ({
        textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000",
        ...style
    })

    const textStyleBlack = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'black', ...additional })
    const textStyleWhite = (top, left, fontSize, additional = {}) => textStyle(top, left, fontSize, { color: 'white', ...additional })

    return (
        <div style={cardWrapperStyle} ref={ref}>
            <img src={`${process.env.PUBLIC_URL}/friends-and-foes/${cardType}.jpg`} style={imageStyle} />
            <div style={withShadow(textStyleWhite(form.nameTop || 7.5, form.nameLeft || 50, form.nameFontSize || "1.7vw", {fontWeight: 'bold', whiteSpace: 'nowrap'}))}>{enrichText(form.name || '')}</div>
            <div style={textStyleBlack(form.textTop || 55, form.textLeft || 50, form.textFontSize || "1.3vw", {display: "flex", flexDirection: 'column'})}>
                <div>{enrichText(form.text || '')}</div>
            </div>
            <div style={textStyleBlack(form.ownerTop || 95.5, form.ownerLeft || 50, form.ownerFontSize || "1vw", {fontWeight: 'bold'})}>{enrichText(form.owner || '')}</div>
            <div style={textStyle(form.creditsTop || 96, form.creditsLeft || 5, form.creditsFontSize || "12px")}>{enrichText(form.credits || '')}</div>
        </div>
    )
}

function FriendFoeForm({ cardType, form, onSubmit }) {
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

    const owner = () => {
        const input = (<div className="form-row">
                <label>Card Owner</label>
                <input
                name="owner"
                value={form.owner}
                onChange={handleChange}
                placeholder="Ganelon"
                />
            </div>)
        return (
            <AdvancedSettingsComponent input={input} name={"owner"} topPlaceholder={"96"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
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
            {owner()}
            {credits()}
        </form>
    )
}
