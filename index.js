
import {levels, levelAvailability, updateData} from './levels.js'

const textElement = document.querySelector('#text')
const textFieldElement = document.querySelector('#text-field')

let currentLevel = levelAvailability.indexOf(false)

let started = false
let startTime
let endTime

loadLevelMenu(levels, levelAvailability, (level, i) => {
    started = false
    currentLevel = i
    onLevelClick(level, i)
})

selectLevel(currentLevel)

loadLevel(currentLevel, levels)

seperateToSpans(textElement)

highlightText(textElement.querySelectorAll('span'), textFieldElement.value)

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

        showMessage(speed, levels[currentLevel].minWPM, accuracy, levels[currentLevel].minAccuracy)

        if(speed >= levels[currentLevel].minWPM && accuracy >= levels[currentLevel].minAccuracy) {
            updateData(currentLevel, true)
            updateLevelMenu(levelAvailability)
        }
    }
})

document.querySelector('#next-level').addEventListener('click', () => {
    started = false
    currentLevel += 1
    loadLevel(currentLevel, levels)
    seperateToSpans(textElement)
    selectLevel(currentLevel)
    highlightText(textElement.querySelectorAll('span'), textFieldElement.value)
    hideMessage()
})

document.querySelector('#restart-level').addEventListener('click', () => {
    started = false
    loadLevel(currentLevel, levels)
    seperateToSpans(textElement)
    highlightText(textElement.querySelectorAll('span'), textFieldElement.value)
    hideMessage()
})

function selectLevel (i) {
    const levelElements = document.querySelectorAll('.level')

    levelElements.forEach(e => e.classList.remove('level--active'))

    levelElements[i].classList.add('level--active')
}

function onLevelClick (level, i) {
    selectLevel(i)
    loadLevel(i, levels)
    seperateToSpans(textElement)
    highlightText(textElement.querySelectorAll('span'), textFieldElement.value)
}

function loadLevelMenu (levels, levelAvailability, onLevelClick) {
    const menu = document.querySelector('#levels')

    for(let i = 0; i < levels.length; i++) {
        let level = document.createElement('button')
        level.classList.add('level')
        if(levelAvailability[i]) {
            level.classList.add('level--completed')
        }
        level.textContent = 'level ' + (i + 1) 
        menu.appendChild(level)
        level.addEventListener('click', () => {
            onLevelClick(level, i)
        })
    }
}

function updateLevelMenu (levelAvailability) {
    const levelElements = document.querySelectorAll('.level')

    levelElements.forEach((e, i) => {
        if(levelAvailability[i]) {
            e.classList.add('level--completed')
        }
    })
}

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

function hideMessage () {
    const resultElement = document.querySelector('.result')
    resultElement.classList.remove('result--win')
    resultElement.classList.remove('result--lose')
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
            if (letterElements[i].textContent == typedText[i]) {
                letterElements[i].classList.remove('letter--wrong')
                letterElements[i].classList.add('letter--correct')
                letterElements[i].classList.remove('letter--current')
            } else {
                letterElements[i].classList.add('letter--wrong')
                letterElements[i].classList.remove('letter--correct')
                letterElements[i].classList.remove('letter--current')
            }
        } else {
            if(i == typedText.length) {
                letterElements[i].classList.remove('letter--wrong')
                letterElements[i].classList.remove('letter--correct')
                letterElements[i].classList.add('letter--current')
            } else {
                letterElements[i].classList.remove('letter--wrong')
                letterElements[i].classList.remove('letter--correct')
                letterElements[i].classList.remove('letter--current')
            }
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