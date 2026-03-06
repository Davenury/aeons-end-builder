import {useState, useEffect} from 'react';
import useCreator from '../common/useCreator';
import useImageUpload from '../common/useImageUpload';
import enrichText from '../common/enriches'
import { useLocalStorage } from "@uidotdev/usehooks";
import advancedSettingsComponents from '../common/advancedSettingsComponents';

export default function Supply() {
    const [cardForm, saveCardForm] = useLocalStorage("supplyCard", {})
    const { form, setForm, captureRef, handleCapture } = useCreator({
        name: 'Power of friendship',
        text: 'When prepared, no ally can be exhausted and Gravehold cannot be destroyed (always on 1 health)',
        cast: 'Win the fight',
        lore: 'This is bullshit ~ Nemesis',
        cost: 0,
        artImageUrl: 'https://m.media-amazon.com/images/I/81luD-FbWEL._AC_UF1000,1000_QL80_.jpg',
        ...cardForm
    });
    const [cardType, setCardType] = useState('spell');

    const handleSetForm = (form) => {
        setForm(form)
        saveCardForm(form)
    }

    return (
        <div>
            <h1>Supply Card Creation</h1>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: "16px"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "30em"}}>
                    <div className={cardType === 'spell' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('spell')}>Spell</div>
                    <div className={cardType === 'gem' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('gem')}>Gem</div>
                    <div className={cardType == 'relic' ? "primary-btn" : "secondary-btn"} onClick={() => setCardType('relic')}>Relic</div>
                </div>
                <div>
                    <div className="primary-btn" onClick={() => handleCapture()}>Ready!</div>
                </div>
            </div>

            <div style={{display: "flex", flexDirection: "row", gap: "2em"}}>
                <div style={{ flex: "0 0 60%" }}>
                    <SupplyCard cardType={cardType} form={form} ref={captureRef} />
                </div>

                <div style={{ flex: "1" }}>
                    <SupplyForm cardType={cardType} form={form} onSubmit={handleSetForm} />
                </div>
            </div>
        </div>
    )
}

function SupplyCard({ cardType, form, ref }) {
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
        marginTop: "70%",
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
    const textStyleLore = (top, left, fontSize) => textStyle(top, left, fontSize, {})

    return (
        <div style={cardWrapperStyle} ref={ref}>
            <img style={innerImageStyle(form.artTop || 0, form.artLeft || 50, {zIndex: -1})} src={form.artImageUrl} />
            <img src={`${process.env.PUBLIC_URL}/supply/${cardType}.png`} style={imageStyle} />
            <div style={textStyleBlack(form.nameTop || 63, form.nameLeft || 50, form.nameFontSize || "1.7vw", {fontWeight: 'bold', whiteSpace: 'nowrap'})}>{enrichText(form.name || '')}</div>
            <div style={textStyleBlack(form.textTop || 77, form.textLeft || 50, form.textFontSize || "1.3vw", {display: "flex", flexDirection: 'column'})}>
                <div>{enrichText(form.text || '')}</div>
                {cardType === 'spell' && <div><span style={{fontWeight: 'bold'}}>Cast: </span>{enrichText(form.cast || '')}</div>}
            </div>
            <div style={textStyleLore(form.loreTop || 96, form.loreLeft || 50, form.loreFontSize || "0.8vw")}>{form.lore}</div>
            <img style={costStyle(0, 100)} src={`${process.env.PUBLIC_URL}/supply/cost.png`}/>
            <div style={textStyleWhite(form.costTop || 6.5, form.costLeft || 91.5, form.costFontSize || "1.5vw")}>{form.cost}</div>
        </div>
    )
}

function SupplyForm({ cardType, form, onSubmit }) {
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
                    {advancedSettingsComponents("name", "63", "50", form, handleChange)}
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
                    {advancedSettingsComponents("text", "77", "50", form, handleChange)}
                </div>
            )
        }
        return input
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
        if (advancedSettings) {
            return (
                <div className='form-grid-4'>
                    {input}
                    {advancedSettingsComponents("cost", "6.5", "91.5", form, handleChange)}
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
                    {advancedSettingsComponents("lore", "96", "50", form, handleChange)}
                </div>
            )
        }
        return input
    }


    return (
        <form className="mage-form" onSubmit={handleSubmit} style={{width: "100%"}}>
            {cardName()}
            {cardText()}
            {cardType === 'spell' && spellCast()}
            {cardCost()}
            {cardArt()}
            {cardLore()}

            <div class="switch-wrapper">
                <input type="checkbox" id="advancedSwitch" class="switch-input" onClick={() => toggleAdvancedSettings(!advancedSettings)} />
                <label for="advancedSwitch" class="switch" />
                <span class="switch-text">Advanced Settings</span>
            </div>
        </form>
    )
}
