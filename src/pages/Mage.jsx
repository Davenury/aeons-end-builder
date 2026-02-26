import {useState, useRef} from 'react';
import html2canvas from 'html2canvas';
import Tooltip from '../components/Tooltip';

export default function Mage() {

    const [charges, setCharges] = useState(5)
    const [form, setForm] = useState({})

    const ref = useRef()

    const handleCapture = () => {
        const element = ref.current

        html2canvas(element, { useCORS: true, allowTaint: false }).then(canvas => {
            const imgData = canvas.toDataURL("image/png")

            const link = document.createElement("a")
            link.href = imgData
            link.download = `${form.name}.png`
            link.click();
        })
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
                    <MageCard charges={charges} form={form} ref={ref} />
                </div>

                <div style={{ flex: "1" }}>
                    <MageForm baseForm={form} onSubmit={setForm} />
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

    const textStyle = (top, left, additional = {}, fontSize = "clamp(12px, 1.5vw, 26px)") => ({
        position: "absolute",
        textAlign: "center",
        width: "40%",
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
        transform: "translate(-50%, -50%)",
    })

    const textStyleGold = (top, left) => textStyle(top, left, { color: 'gold' })
    const textStyleStarting = (top, left) => textStyle(top, left, {}, "clamp(12px, 1.5vw, 14px)")

    return (
        <div style={cardWrapperStyle} ref={ref}>
            <img src={`${process.env.PUBLIC_URL}/mages/${charges} charge mage.png`} style={imageStyle}/>
            <img src={`${process.env.PUBLIC_URL}/mages/breach-${form.breach0}.png`} style={innerImageStyle(form.breach0Top ?? 6.5, form.breach0Left ?? 7)} width="4%" />
            <img src={`${process.env.PUBLIC_URL}/mages/breach-${form.breach1}.png`} style={innerImageStyle(form.breach1Top ?? 6.5, form.breach1Left ?? 30)} width="4%" />
            <img src={`${process.env.PUBLIC_URL}/mages/breach-${form.breach2}.png`} style={innerImageStyle(form.breach2Top ?? 6.5, form.breach2Left ?? 72)} width="4%" />
            <img src={`${process.env.PUBLIC_URL}/mages/breach-${form.breach3}.png`} style={innerImageStyle(form.breach3Top ?? 6.5, form.breach3Left ?? 97)} width="4%" />
            <div style={textStyle(form.nameTop ?? 12, form.nameLeft ?? 71)}>{form.name}</div>
            <div style={textStyleGold(form.titleTop ?? 17, form.titleLeft ?? 71)}>{form.title}</div>
            <div style={textStyleStarting(form.handTop ?? 42.5, form.handLeft ?? 71)}>{form.startingHand}</div>
            <div style={textStyleStarting(form.deckTop ?? 49, form.deckLeft ?? 71)}>{form.startingDeck}</div>
            <div style={textStyleGold(form.abilityNameTop ?? 54, form.abilityNameLeft ?? 71)}>{form.abilityName}</div>
            <div style={textStyle(form.abilityUsageTop ?? 59, form.abilityUsageLeft ?? 71, {fontWeight: "bold"}, "clamp(12px, 100%, 18px)")}>{form.abilityUsage}</div>
            <div style={textStyle(form.abilityDescTop ?? 73, form.abilityDescLeft ?? 71, {}, "clamp(12px, 100%, 18px)")}>{form.abilityDesc}</div>
            <img style={innerImageStyle(form.artTop ?? 60, form.artLeft ?? 23)} width={form.artWidth} src={form.artImageUrl} />
        </div>
    )
}

function MageForm({
    onSubmit
}) {

    const [advancedSettings, toggleAdvancedSettings] = useState(false)

    const [form, setForm] = useState({
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
        breach1: 'open',
        breach2: 'open',
        breach3: 'open',
        nameTop: null,
        nameLeft: null,
        titleTop: null,
        titleLeft: null,
        artTop: null,
        artLeft: null,
        handTop: null,
        handLeft: null,
        deckTop: null,
        deckLeft: null,
        abilityNameTop: null,
        abilityNameLeft: null,
        abilityUsageTop: null,
        abilityUsageLeft: null,
        abilityDescTop: null,
        abilityDescLeft: null,
        breach0Top: null,
        breach0Left: null,
        breach1Top: null,
        breach1Left: null,
        breach2Top: null,
        breach2Left: null,
        breach3Top: null,
        breach3Left: null,
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
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
                <option value="right">Right</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
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
                <div className='form-grid-3'>
                    {input}
                    <div className="form-row">
                        <label>Top</label>
                        <input
                        name="nameTop"
                        value={form.nameTop}
                        onChange={handleChange}
                        placeholder="12"
                        />
                    </div>
                    <div className="form-row">
                        <label>Left</label>
                        <input
                        name="nameLeft"
                        value={form.nameLeft}
                        onChange={handleChange}
                        placeholder="71"
                        />
                    </div>
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
                <div className='form-grid-3'>
                    {input}
                    <div className="form-row">
                        <label>Top</label>
                        <input
                        name="titleTop"
                        value={form.titleTop}
                        onChange={handleChange}
                        placeholder="17"
                        />
                    </div>
                    <div className="form-row">
                        <label>Left</label>
                        <input
                        name="titleLeft"
                        value={form.titleLeft}
                        onChange={handleChange}
                        placeholder="71"
                        />
                    </div>
                </div>
            )
        }
        return input
    }

    const mageArt = () => {
        const input = (
            <div>
                <Tooltip text="Some images might not work when pasted from URL. Use base64 image encoder like: https://www.base64-image.de/" />
                <div className="form-grid">
                    <div className="form-row">
                        <label>Art Url</label>
                        <input
                        name="artImageUrl"
                        value={form.artImageUrl}
                        onChange={handleChange}
                        placeholder="https://i.pinimg.com/1200x/05/e4/f5/05e4f5328d221bbddb6a10fb9523895b.jpg"
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
                <div className='form-grid-3'>
                    {input}
                    <div className="form-row">
                        <label>Top</label>
                        <input
                        name="artTop"
                        value={form.artTop}
                        onChange={handleChange}
                        placeholder="60"
                        />
                    </div>
                    <div className="form-row">
                        <label>Left</label>
                        <input
                        name="artLeft"
                        value={form.artLeft}
                        onChange={handleChange}
                        placeholder="23"
                        />
                    </div>
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
                <div className='form-grid-3'>
                    {input}
                    <div className="form-row">
                        <label>Top</label>
                        <input
                        name="handTop"
                        value={form.handTop}
                        onChange={handleChange}
                        placeholder="42.5"
                        />
                    </div>
                    <div className="form-row">
                        <label>Left</label>
                        <input
                        name="handLeft"
                        value={form.handLeft}
                        onChange={handleChange}
                        placeholder="71"
                        />
                    </div>
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
                <div className='form-grid-3'>
                    {input}
                    <div className="form-row">
                        <label>Top</label>
                        <input
                        name="deckTop"
                        value={form.deckTop}
                        onChange={handleChange}
                        placeholder="49"
                        />
                    </div>
                    <div className="form-row">
                        <label>Left</label>
                        <input
                        name="deckLeft"
                        value={form.deckLeft}
                        onChange={handleChange}
                        placeholder="71"
                        />
                    </div>
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
                <div className='form-grid-3'>
                    {input}
                    <div className="form-row">
                        <label>Top</label>
                        <input
                        name="abilityNameTop"
                        value={form.abilityNameTop}
                        onChange={handleChange}
                        placeholder="54"
                        />
                    </div>
                    <div className="form-row">
                        <label>Left</label>
                        <input
                        name="abilityNameLeft"
                        value={form.abilityNameLeft}
                        onChange={handleChange}
                        placeholder="71"
                        />
                    </div>
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
                <div className='form-grid-3'>
                    {input}
                    <div className="form-row">
                        <label>Top</label>
                        <input
                        name="abilityUsageTop"
                        value={form.abilityUsageTop}
                        onChange={handleChange}
                        placeholder="54"
                        />
                    </div>
                    <div className="form-row">
                        <label>Left</label>
                        <input
                        name="abilityUsageLeft"
                        value={form.abilityUsageLeft}
                        onChange={handleChange}
                        placeholder="71"
                        />
                    </div>
                </div>
            )
        }
        return input
    }

    const abilityDesc = () => {
        const input = (<div className="form-row">
                <label>Ability Description</label>
                <textarea
                name="abilityDesc"
                value={form.abilityDesc}
                onChange={handleChange}
                rows={4}
                />
            </div>)
        if (advancedSettings) {
            return (
                <div className='form-grid-3'>
                    {input}
                    <div className="form-row">
                        <label>Top</label>
                        <input
                        name="abilityDescTop"
                        value={form.abilityDescTop}
                        onChange={handleChange}
                        placeholder="73"
                        />
                    </div>
                    <div className="form-row">
                        <label>Left</label>
                        <input
                        name="abilityDescLeft"
                        value={form.abilityDescLeft}
                        onChange={handleChange}
                        placeholder="71"
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
                                        name={`breach${it}Top`}
                                        value={form[`breach${it}Top`]}
                                        onChange={handleChange}
                                        placeholder="73"
                                        />
                                    </div>
                                    <div className="form-row">
                                        <label>Left</label>
                                        <input
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

            <div style={{display: 'flex', justifyContent: "space-between"}}>
                <button type="submit" className="primary-btn">
                    Update Mage
                </button>
                <div className="secondary-btn" onClick={() => toggleAdvancedSettings(!advancedSettings)}>Advanced Settings</div>
            </div>
        </form>
    )
}