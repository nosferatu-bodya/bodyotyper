
import levels from './levels.js'

const textElement = document.querySelector('#text')
const textFieldElement = document.querySelector('#text-field')

loadLevel(0, levels)

seperateToSpans(textElement)

textFieldElement.addEventListener('input', e => {
    highlightText(textElement.querySelectorAll('span'), e.target.value)
})

function highlightText (letterElements, typedText) {
    for(let i = 0; i < letterElements.length; i++){
        if(typedText[i]) {
            if(i === typedText.length) {
                letterElements[i].classList.remove('letter--wrong')
                letterElements[i].classList.remove('letter--correct')
                letterElements[i].classList.add('letter--current')
            } else if (letterElements[i].textContent == typedText[i]) {
                letterElements[i].classList.remove('letter--wrong')
                letterElements[i].classList.add('letter--correct')
                letterElements[i].classList.remove('letter--current')
            } else {
                letterElements[i].classList.add('letter--wrong')
                letterElements[i].classList.remove('letter--correct')
                letterElements[i].classList.remove('letter--current')
            }
        } else {
            letterElements[i].classList.remove('letter--wrong')
            letterElements[i].classList.remove('letter--correct')
            letterElements[i].classList.remove('letter--current')
        }
    }
}

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