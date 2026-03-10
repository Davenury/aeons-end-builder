import FieldSettings from "../components/FieldSettings";
import SliderInput from "../components/SliderInput";

export default function AdvancedSettingsComponent({ input, name, topPlaceholder, leftPlaceholder, form, handleChange, type }) {

    if (type === "customBackground") {
        return (
            <FieldSettings
                type={type}
                panel={
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
                    { ((name != "art" && !name.includes('breach'))) && (
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
                        ((name === "lore" || name === "additionalRules" || name === "abilityDesc") && (
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