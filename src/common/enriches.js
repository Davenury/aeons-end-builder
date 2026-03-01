const enriches = {
    "aether": {
        src: "data:image/png;base64,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",
        type: "image",
        style: {height: "1em", verticalAlign: "middle"}
    },
    "aether-white": {
        src: "data:image/png;base64,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",
        style: { filter: 'invert(1)', height: "1em", verticalAlign: "middle" },
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