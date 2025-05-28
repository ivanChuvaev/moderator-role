declare global {
    namespace JSX {
        interface IntrinsicElements {
            'restrictions-renderer': React.DetailedHTMLProps<
                { data: string, class?: string },
                HTMLElement
            >
        }
    }
}

export {}
