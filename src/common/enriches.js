const enriches = {
    "aether": {
        src: "data:image/png;base64,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",
        type: "image",
        style: {height: "1em", verticalAlign: "middle"}
    },
    "aether-white": {
        src: "data:image/png;base64,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",
        style: { height: "1em", verticalAlign: "middle" },
        type: "image"
    },
    "newline": {
        type: "newline"
    },
    "bold": {
        style: {fontWeight: 'bold'}
    },
    "red": {
        style: {backgroundColor: 'red'}
    }
}

const getHTML = (enrich, key) => {
    switch(enrich.type) {
        case "image":
            return (
                <img src={enrich.src ?? ''} key={key} alt={enrich?.alt ?? ''} style={enrich.style ?? {}} />
            )
        case "newline":
            return (
                <br />
            )
        case "text":
            return (
                <span style={{display: 'inline', ...(enrich.styles ?? {})}}>{enrich.text}</span>
            )
        default:
            return (
                <span>Error: unknown enrich type: {enrich.type}</span>
            )
    }
}

export default function enrichText (text) {
  const parts = text.split(/\$\{(.*?)\}/g);

  return parts.map((part, index) => {
    if (enriches[part]) {
      return getHTML(enriches[part])
    }

    const textWithModifiers = part.split('|')
    if (textWithModifiers.length < 2) {
        return part;
    }
    const text = textWithModifiers.shift()
    const styles = textWithModifiers.reduce((acc, curr) => {
        if (enriches[curr]) {
            return {...acc, ...(enriches[curr]?.style ?? {}) }
        }
        return acc
    }, {})

    return getHTML({
        "type": "text",
        text,
        styles
    }, index)
  });
};