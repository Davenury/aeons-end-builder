export default function advancedSettingsComponents(name, topPlaceholder, leftPlaceholder, form, handleChange) {
    return (
        <>
            <div className="form-row">
                <label>Top</label>
                <input
                type="number"
                name={`${name}Top`}
                value={form?.[`${name}Top`]}
                onChange={handleChange}
                placeholder={topPlaceholder}
                />
            </div>
            <div className="form-row">
                <label>Left</label>
                <input
                type="number"
                name={`${name}Left`}
                value={form?.[`${name}Left`]}
                onChange={handleChange}
                placeholder={leftPlaceholder}
                />
            </div>
            { name != "art" && (
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
        </>
    )
}