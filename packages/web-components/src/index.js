class RestrictionsRenderer extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        const sheet = new CSSStyleSheet()

        sheet.replaceSync(`
            .restrictions {
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            li {
                list-style: none;
            }
            label {
                padding-inline: 4px;
                font-size: 16px;
                font-weight: bold;
                text-transform: uppercase;
            }
            .value {
                font-size: 16px;
            }
            .value span {
                background-color: rgb(229 229 229);
                border: 1px solid #b5b5b5;
                padding-inline: 4px;
                border-radius: 4px;
            }
        `)

        this.shadowRoot.adoptedStyleSheets = [sheet]

        this._render()

        this._observer = new MutationObserver(this._render.bind(this))

        this._observer.observe(this, { attributes: true })
    }

    disconnectedCallback() {
        if (this._observer) {
            this._observer.disconnect()
        }
    }

    _parseData(dataStr) {
        try {
            let data = JSON.parse(dataStr)
            if (
                typeof data !== 'object' ||
                data === null ||
                data === undefined
            ) {
                throw new Error()
            }
            for (const key of Object.keys(data)) {
                if (
                    typeof data[key] !== 'object' ||
                    data[key] === null ||
                    data[key] === undefined ||
                    !Object.keys(data[key]).includes('min') ||
                    !Object.keys(data[key]).includes('max')
                ) {
                    delete data[key]
                }
            }
            return data
        } catch (error) {
            return null
        }
    }

    _render() {
        const data = this._parseData(this.getAttribute('data'))

        let content = ''

        for (const key of Object.keys(data)) {
            content += `
                <li>
                    <label>${key}</label>
                    <span class="value"><span>${data[key].min}</span> - <span>${data[key].max}</span></span>
                </li>
            `
        }

        this.shadowRoot.innerHTML = `
            <ul class="restrictions">
                ${content}
            </ul>
        `
    }
}

customElements.define('restrictions-renderer', RestrictionsRenderer)
