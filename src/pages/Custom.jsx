import {useState, useEffect} from 'react';
import useCreator from '../common/useCreator';
import useImageUpload from '../common/useImageUpload';
import enrichText from '../common/enriches'
import AdvancedSettingsComponent from '../common/advancedSettingsComponents';
import DataHandler from '../components/DataHandler';
import sanitizeCustomStyle from '../common/sanitize';

export default function CustomContent() {
    const { form, setForm, captureRef, handleCapture, importForm, importRef, exportForm } = useCreator({});

    const [formFields, setFormFields] = useState([]);

    const handleSetForm = (form) => {
        setForm(form)
    }

    return (
        <div>
            <h1>Custom Content Creation</h1>
            <h2>Changes on this page are not persisted the way they are on the other pages! If you refresh this page, you will loose your progress!</h2>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: "16px"}}>
                <DataHandler handleCapture={handleCapture} importRef={importRef} importForm={importForm} exportForm={exportForm} showImportExport={false} />
            </div>

            <div style={{display: "flex", flexDirection: "row", gap: "2em"}}>
                <div style={{ flex: "0 0 60%" }}>
                    <CustomContentDisplay form={form} ref={captureRef} formFields={formFields} />
                </div>

                <div style={{ flex: "1" }}>
                    <CustomContentForm form={form} onSubmit={handleSetForm} formFields={formFields} setFormFields={setFormFields} />
                </div>
            </div>
        </div>
    )
}

function CustomContentDisplay({ form, ref, formFields }) {

    const cardWrapperStyle = {
        position: "relative",
        width: "50%",
        border: "2px solid white",
        overflow: "hidden",
        maxWidth: "1200px",
        maxHeight: "1200px"
    };

    const imageStyle = {
        width: "100%",
        height: "100%",
        display: "block",
    };

    return (
        <div style={cardWrapperStyle} ref={ref}>
            {form.backgroundImage && (
                <img
                    src={form.backgroundImage}
                    style={imageStyle}
                />
            )}

            {formFields.map((field) => (
                <div
                    key={field.name}
                    style={{
                        position: "absolute",
                        top: `${form[`${field.name}Top`] ?? 50}%`,
                        left: `${form[`${field.name}Left`] ?? 50}%`,
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                    }}
                >
                    {displayFunction(field.type, field.name, form)}
                </div>
            ))}
        </div>
    );
}

function CustomContentForm({ form, onSubmit, formFields, setFormFields }) {

    const [showCreator, setShowCreator] = useState(false);
    const [newField, setNewField] = useState({
        label: '',
        name: '',
        type: 'text',
    });

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

    const backgroundImage = () => {
            const input = (
                <div>
                    <div className="form-row">
                        <label>Background Image</label>
                        <input
                        type="file"
                        name="backgroundImage"
                        onChange={handleFileChange}
                        />
                    </div>
                </div>
            )
    
            return (
                <AdvancedSettingsComponent input={input} name={"art"} topPlaceholder={"0"} leftPlaceholder={"50"} form={form} handleChange={handleChange} />
            )
        }

    const deleteField = (fieldName) => {
        setFormFields(prev => prev.filter(f => f.name !== fieldName));

        // also remove from form data
        const newForm = { ...form };
        delete newForm[fieldName];
        onSubmit(newForm);
    }

    return (
        <div className="mage-form">
            {backgroundImage()}

            {formFields.map(field => (
                <div key={field.name} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
                    <div style={{ flexGrow: 1 }}>
                        <AdvancedSettingsComponent
                            input={
                                <div className="form-row">
                                    <label>{field.label}</label>
                                    {
                                        field.type === 'file' && (
                                            <input
                                                name={field.name}
                                                onChange={handleFileChange}
                                                type={field.type}
                                            />
                                        )
                                    }
                                    {
                                        field.type !== 'file' && (
                                            <input
                                                name={field.name}
                                                value={form[field.name] ?? ''}
                                                onChange={handleChange}
                                                type={field.type}
                                            />
                                        )
                                    }
                                </div>
                            }
                            name={field.name}
                            form={form}
                            handleChange={handleChange}
                            topPlaceholder="50"
                            leftPlaceholder="50"
                        />
                    </div>
                    <div>
                        <div
                            className="secondary-btn"
                            onClick={() => deleteField(field.name)}
                        >
                            Delete
                        </div>
                    </div>
                </div>
            ))}

            {/* Field Creator */}
            <div style={{ marginTop: '20px' }}>
                {!showCreator ? (
                    <div
                        className="primary-btn"
                        onClick={() => setShowCreator(true)}
                    >
                        + Add Field
                    </div>
                ) : (
                    <div style={{ border: '1px solid rgba(255,215,140,0.3)', borderRadius: '8px', padding: '14px', background: '#1a1a2b', boxShadow: '0 10px 25px rgba(0,0,0,0.6)' }}>
                        <div className="form-row">
                            <label>Label</label>
                            <input
                                placeholder="Field Label"
                                value={newField.label}
                                onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                            />
                        </div>
                        <div className="form-row">
                            <label>Name (key)</label>
                            <input
                                placeholder="Field Key"
                                value={newField.name}
                                onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                            />
                        </div>
                        <div className="form-row">
                            <label>Type</label>
                            <select
                                value={newField.type}
                                onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                            >
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                                <option value="file">Image</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                            <div
                                className="primary-btn"
                                onClick={() => {
                                    setFormFields(prev => [...prev, { ...newField }]);
                                    setShowCreator(false);
                                    setNewField({ label: '', name: '', type: 'text' });
                                }}
                            >
                                Add
                            </div>
                            <div
                                className="secondary-btn"
                                onClick={() => setShowCreator(false)}
                            >
                                Cancel
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const displayFunction = (fieldType, fieldName, form) => {

    const textStyle = (top, left, fontSize, additional = {}) => ({
        position: "absolute",
        textAlign: "center",
        width: "85%",
        top: `${top}%`,
        left: `${left}%`,
        transform: "translate(-50%, -50%)",
        fontSize,
        color: "white",
        zIndex: 1,
        ...additional
    })

    const innerImageStyle = (top, left, scaleValue = 0, additional = {}) => {
        const scale = 1 + scaleValue / 100;
        return {
            position: "absolute",
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            objectFit: 'cover',
            zIndex: 1,
            ...additional,
        }
    }

    switch(fieldType) {
        case 'text':
            return (
                <div style={textStyle(form[`${fieldName}Top`] ?? 0, form[`${fieldName}Left`] ?? 0, form[`${fieldName}FontSize`] ?? '1vw', {...sanitizeCustomStyle(form[`${fieldName}CustomStyle`] ?? {})})}>{enrichText(form[`${fieldName}`] || '')}</div>
            )
        case 'number':
            return (
                <div style={textStyle(form[`${fieldName}Top`] ?? 0, form[`${fieldName}Left`] ?? 0, form[`${fieldName}FontSize`] ?? '1vw', {...sanitizeCustomStyle(form[`${fieldName}CustomStyle`] ?? {})})}>{enrichText(form[`${fieldName}`] || '')}</div>
            )
        case 'file':
            return (
                <img style={{...innerImageStyle(form[`${fieldName}Top`] || 0, form[`${fieldName}Left`] || 50, form[`${fieldName}Scale`] || 0, {zIndex: -1}), ...sanitizeCustomStyle(form[`${fieldName}CustomStyle`])}} src={form[`${fieldName}`]} />
            )
    }
}
