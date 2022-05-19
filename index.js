
import levels from './levels.js'

const textElement = document.querySelector('#text')
const textFieldElement = document.querySelector('#text-field')

loadLevel(0, levels)

seperateToSpans(textElement)

function seperateToSpans(element) {
    let text = element.textContent
    let res = ''

    element.querySelectorAll('span').forEach(c => c.remove())
    element.textContent = ''

    for(let i = 0; i < text.length; i++){
        res += '<span>' + text[i] + '</span>'
    }

    element.innerHTML = res
}

function loadLevel (index, levels) {
    document.querySelector('#text').textContent = levels[index].text
    document.querySelector('#text-field').value = ''
}