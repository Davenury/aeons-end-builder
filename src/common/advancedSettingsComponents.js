import FieldSettings from "../components/FieldSettings";
import SliderInput from "../components/SliderInput";

export default function AdvancedSettingsComponent({ input, name, topPlaceholder, leftPlaceholder, form, handleChange, type, showCharLimit }) {

    const customCss = (
        <div className="form-row">
            <label style={{fontSize: '14px'}}>Custom CSS (write custtom css in React style to be passed to the image)</label>
            <textarea
                name="customBackgroundStyle"
                value={form.customBackgroundStyle}
                onChange={handleChange}
                rows={4}
                placeholder={`e.g. {"opacity": "50%"} to reduce brigthness of the background`}
            />
        </div>
    )

    if (type === "swirl") {
        return (
            <FieldSettings
                type={type}
                panel={
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
                }
            >
                {input}
            </FieldSettings>
        )
    }

    if (type === "customBackground" || type === "nemesisImage") {
        return (
            <FieldSettings
                type={type}
                panel={
                    customCss
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
                        min={0}
                        max={100}
                        step={0.1}
                        value={form?.[`${name}Top`] || +topPlaceholder}
                        onChange={handleChange}
                        placeholder={+topPlaceholder}
                    />
                    <SliderInput
                        name={`${name}Left`}
                        label="Left"
                        min={0}
                        max={100}
                        step={0.1}
                        value={form?.[`${name}Left`] || +leftPlaceholder}
                        onChange={handleChange}
                        placeholder={+leftPlaceholder}
                    />
                    { (name != "art" && type !== "breach") && (
                            <div className="form-row">
                                <label>Font Size</label>
                                <input
                                    type="text"
                                    name={`${name}FontSize`}
                                    value={form?.[`${name}FontSize`]}
                                    onChange={handleChange}
                                />
                            </div>
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
                </>
            }
        >
            {input}
        </FieldSettings>
    )
}