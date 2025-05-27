declare global {
    namespace JSX {
        interface IntrinsicElements {
            /** Tool cool range slider, docs: https://toolcool-range-slider.mzsoft.org */
            'tc-range-slider': React.DetailedHTMLProps<any, HTMLElement>
            'restrictions-renderer': React.DetailedHTMLProps<
                { data: string },
                HTMLElement
            >
        }
    }
}

export {}
