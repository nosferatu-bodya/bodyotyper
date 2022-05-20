
import {levels, levelAvailability, updateData} from './levels.js'

const textElement = document.querySelector('#text')
const textFieldElement = document.querySelector('#text-field')

let currentLevel = 0

let started = false
let startTime
let endTime

loadLevel(currentLevel, levels)

seperateToSpans(textElement)

textFieldElement.addEventListener('input', e => {

    if(!started) {
        startTime = new Date().getTime()
        started = true
    }

    highlightText(textElement.querySelectorAll('span'), e.target.value)

    if(e.target.value.length >= levels[currentLevel].text.length) {
        textFieldElement.blur()

        endTime = new Date().getTime()
        let time = (endTime - startTime) / 1000 / 60
        let words = levels[currentLevel].text.split(' ').length
        let speed = getSpeed(time, words)

        let letters = levels[currentLevel].text.length
        let mistakes = textElement.querySelectorAll('.letter--wrong').length
        let accuracy = getAccuracy(letters, mistakes)

        showMessage(speed, levels[currentLevel].minWPM, accuracy, levels[currentLevel].minWPM)
    }
})

function showMessage (speed, levelSpeed, accuracy, levelAccuracy) {
    const resultElement = document.querySelector('.result')

    document.querySelector('#user-wpm').textContent = speed
    document.querySelector('#level-wpm').textContent = levelSpeed
    document.querySelector('#user-accuracy').textContent = accuracy
    document.querySelector('#level-accuracy').textContent = levelAccuracy

    if(speed >= levelSpeed && accuracy >= levelAccuracy) {
        resultElement.classList.add('result--win')
    } else {
        resultElement.classList.add('result--lose')
    }
}

function getAccuracy(letters, mistakes) {
    return 100 - Math.floor((100 * mistakes) / letters)
}

function getSpeed(time, words) {
    return (words / time).toFixed(1)
}

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