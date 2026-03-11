export default function DataHandler({handleCapture, importRef, importForm, exportForm}) {
    return (
        <div style={{display: 'flex', flexDirection: 'row', gap: '1em'}}>
            <div className="secondary-btn" onClick={() => exportForm()}>Export</div>
            <input
                type="file"
                accept="application/json"
                ref={importRef}
                style={{ display: "none" }}
                onChange={importForm}
            />
            <div className="secondary-btn" onClick={() => importRef.current.click()}>Import</div>
            <div className="primary-btn" onClick={() => handleCapture()}>Download Image</div>
        </div>
    )
}