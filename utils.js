/* Funções uteis */

export default function importCSS(cssFile) {
    const style = document.querySelector('link[href="'+cssFile+'"]')
    if (!style) {
        document.head.innerHTML += '<link rel="stylesheet" href="'+cssFile+'">'
    }
}