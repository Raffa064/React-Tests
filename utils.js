/* Funções uteis */

export function importCSS(cssFile) {
    const style = document.querySelector('link[href="'+cssFile+'"]')
    if (!style) {
        document.head.innerHTML += '<link rel="stylesheet" href="'+cssFile+'">'
    }
}

export function randomId() {
    return (Math.random() * 1000000).toString(16)
}