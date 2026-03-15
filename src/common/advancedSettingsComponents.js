import FieldSettings from "../components/FieldSettings";
import SliderInput from "../components/SliderInput";

export default function AdvancedSettingsComponent({ input, name, topPlaceholder, leftPlaceholder, form, handleChange, type, showCharLimit, handleFileUpload }) {

    const customCss = (
        <div className="form-row">
            <label style={{fontSize: '14px'}}>Custom CSS (write custtom css in React style to be passed to the image)</label>
            <textarea
                name={`${name}CustomStyle`}
                value={form?.[`${name}CustomStyle`]}
                onChange={handleChange}
                rows={4}
                placeholder={`e.g. {"opacity": "50%"} to reduce brigthness of the background`}
            />
        </div>
    )

    const swirl = (
        <>
            <SliderInput
                name={`${name}Swirl`}
                label="Swirl"
                min={0}
                max={100}
                step={1}
                value={form?.[`${name}Swirl`] || 15}
                onChange={handleChange}
                placeholder="15"
            />
            <SliderInput
                name={`${name}X`}
                label="X"
                min={0}
                max={1000}
                step={1}
                value={form?.[`${name}X`]}
                onChange={handleChange}
            />
            <SliderInput
                name={`${name}Y`}
                label="Y"
                min={0}
                max={1000}
                step={1}
                value={form?.[`${name}Y`]}
                onChange={handleChange}
            />
            {customCss}
        </>
    )

    if (type === "swirl") {
        return (
            <FieldSettings
                type={type}
                panel={
                    (
                        <>
                            {swirl}
                            <SliderInput
                                name={`${name}Top`}
                                label="Top"
                                min={-100}
                                max={100}
                                step={1}
                                value={form?.[`${name}Top`] || +topPlaceholder}
                                onChange={handleChange}
                                placeholder={+topPlaceholder}
                            />
                            <SliderInput
                                name={`${name}Left`}
                                label="Left"
                                min={-100}
                                max={100}
                                step={1}
                                value={form?.[`${name}Left`] || +leftPlaceholder}
                                onChange={handleChange}
                                placeholder={+leftPlaceholder}
                            />
                        </>
                    )
                }
            >
                {input}
            </FieldSettings>
        )
    }

    return (
        <FieldSettings
            type={type}
            panel={
                 <>
                    <SliderInput
                        name={`${name}Top`}
                        label="Top"
                        min={-100}
                        max={100}
                        step={0.1}
                        value={form?.[`${name}Top`] || +topPlaceholder}
                        onChange={handleChange}
                        placeholder={+topPlaceholder}
                    />
                    <SliderInput
                        name={`${name}Left`}
                        label="Left"
                        min={-100}
                        max={100}
                        step={0.1}
                        value={form?.[`${name}Left`] || +leftPlaceholder}
                        onChange={handleChange}
                        placeholder={+leftPlaceholder}
                    />
                    { (name != "art" && type !== "breach" && type !== "customBackground" && type !== "nemesisImage") && (
                            <div className="form-row">
                                <label>Font Size</label>
                                <input
                                    type="text"
                                    name={`${name}FontSize`}
                                    value={form?.[`${name}FontSize`]}
                                    onChange={handleChange}
                                    placeholder="You have to include css unit, like 12px or 1em"
                                />
                            </div>
                        )
                    }
                    {
                        (name === "art" || type === "customBackground" || type === "nemesisImage") && (
                            <>
                                <SliderInput
                                    name={`${name}Scale`}
                                    label="Scale"
                                    min={-100}
                                    max={100}
                                    step={0.1}
                                    value={form?.[`${name}Scale`] || 0}
                                    onChange={handleChange}
                                    placeholder={"0"}
                                />
                                {customCss}
                            </>
                        )
                    }
                    {
                        ((name === "lore" || name === "additionalRules" || name === "abilityDesc" || showCharLimit) && (
                            <div className="form-row">
                                <label>Character Limit</label>
                                <input
                                    type="number"
                                    name={`${name}CharLimit`}
                                    value={form?.[`${name}CharLimit`]}
                                    onChange={handleChange}
                                />
                            </div>
                        ))
                    }
                    {
                        type === "breach" && (
                            <>
                                <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                                    <div className="form-row" style={{width: "70%"}}>
                                        <label>Art</label>
                                        <input
                                        type="file"
                                        name={`${name}ImageUrl`}
                                        onChange={handleFileUpload}
                                        />
                                    </div>
                                    <div className="form-row" style={{marginTop: 'calc(0.9rem + 12px)', width: '15%'}}>
                                        <div className="secondary-btn" onClick={() => handleChange({target: {name: `${name}ImageUrl`, value: null}})}>
                                            Reset
                                        </div>
                                    </div>
                                </div>
                                {!!form?.[`${name}ImageUrl`] && swirl}
                            </>
                        )
                    }
                </>
            }
        >
            {input}
        </FieldSettings>
    )
}