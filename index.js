
import { levels, levelAvailability, updateData } from './levels.js'

const textElement = document.querySelector('#text')
const textFieldElement = document.querySelector('#text-field')

let currentLevel = levelAvailability.indexOf(false)

let started = false
let finished = false
let startTime
let endTime

loadLevelMenu(levels, levelAvailability, (level, i) => {
    finished = false
    started = false
    currentLevel = i
    onLevelClick(level, i)
})

selectLevel(currentLevel)

loadLevel(currentLevel, levels)

seperateToSpans(textElement)

highlightText(textElement.querySelectorAll('span'), textFieldElement.value)
highlightKey(textElement.textContent[textFieldElement.value.length])
highlightFinger(textElement.textContent[textFieldElement.value.length])

const about = navigator.userAgent
const phoneRegex = /android|iphone|kindle|ipad/i

if(phoneRegex.test(about)) {
    document.querySelector('.phone-warning-container').classList.add('phone-warning-container--active')
}

document.querySelector('#close-phone-warning').addEventListener('click', () => {
    document.querySelector('.phone-warning-container').classList.remove('phone-warning-container--active')
})

document.addEventListener('keypress', e => {
    if(!finished) {
        textFieldElement.focus()
    }
})

textFieldElement.addEventListener('input', e => {

    if (!started) {
        startTime = new Date().getTime()
        started = true
    }

    highlightKey(textElement.textContent[e.target.value.length])
    highlightText(textElement.querySelectorAll('span'), e.target.value)
    highlightFinger(textElement.textContent[e.target.value.length])

    if (e.target.value.length >= levels[currentLevel].text.length) {
        textFieldElement.blur()
        finished = true

        endTime = new Date().getTime()
        let time = (endTime - startTime) / 1000 / 60
        let words = levels[currentLevel].text.split(' ').length
        let speed = getSpeed(time, words)

        let letters = levels[currentLevel].text.length
        let mistakes = textElement.querySelectorAll('.letter--wrong').length
        let accuracy = getAccuracy(letters, mistakes)

        console.log( currentLevel >= (levels.length - 1))
        let isLastLevel = currentLevel >= (levels.length - 1)

        showMessage(speed, levels[currentLevel].minWPM, accuracy, levels[currentLevel].minAccuracy, isLastLevel)

        if (speed >= levels[currentLevel].minWPM && accuracy >= levels[currentLevel].minAccuracy) {
            updateData(currentLevel, true)
            updateLevelMenu(levelAvailability)
        }
    }
})

document.querySelector('#next-level').addEventListener('click', () => {
    finished = false
    started = false
    currentLevel += 1
    loadLevel(currentLevel, levels)
    seperateToSpans(textElement)
    selectLevel(currentLevel)
    highlightText(textElement.querySelectorAll('span'), textFieldElement.value)
    highlightKey(textElement.textContent[textFieldElement.value.length])
    highlightFinger(textElement.textContent[textFieldElement.value.length])
    hideMessage()
})

document.querySelector('#restart-level').addEventListener('click', () => {
    finished = false
    started = false
    loadLevel(currentLevel, levels)
    seperateToSpans(textElement)
    highlightText(textElement.querySelectorAll('span'), textFieldElement.value)
    highlightKey(textElement.textContent[textFieldElement.value.length])
    highlightFinger(textElement.textContent[textFieldElement.value.length])
    hideMessage()
})

function highlightFinger(symbol) {
    if (!symbol) {
        return
    }

    const keysToHighlight = symbolToKeyIDs(symbol)
    let fingers = []

    document.querySelectorAll('.nail').forEach(n => n.classList.remove('nail--active'))

    document.querySelectorAll(keysToHighlight).forEach(k => {
        let curFinger = {}
        if (k.classList.contains('left-hand-key')) {
            curFinger.hand = 'left-hand'
        } else {
            curFinger.hand = 'right-hand'
        }

        if (k.classList.contains('little-finger-key')) {
            curFinger.finger = 'little-nail'
        } else if (k.classList.contains('ring-finger-key')) {
            curFinger.finger = 'ring-nail'
        } else if (k.classList.contains('middle-finger-key')) {
            curFinger.finger = 'middle-nail'
        } else if (k.classList.contains('index-finger-key')) {
            curFinger.finger = 'index-nail'
        } else if (k.classList.contains('thumb-finger-key')) {
            curFinger.finger = 'thumb-nail'
        }

        fingers.push(curFinger)
    })

    fingers.forEach((f, i) => {
        const selector = '#' + f.hand + ' .' + f.finger
        document.querySelector(selector).classList.add('nail--active')
    })

}

function highlightKey(symbol) {
    if (!symbol) {
        return
    }

    let ids = symbolToKeyIDs(symbol)

    document.querySelectorAll('.key').forEach(k => k.classList.remove('key--active'))

    document.querySelectorAll(ids).forEach(e => e.classList.add('key--active'))
}

function symbolToKeyIDs(symbol) {
    let ids = []
    switch (symbol) {
        case '!': {
            ids.push('key-1')
            ids.push('key-right-shift')
            break
        }
        case '@': {
            ids.push('key-2')
            ids.push('key-right-shift')
            break
        }
        case '#': {
            ids.push('key-3')
            ids.push('key-right-shift')
            break
        }
        case '$': {
            ids.push('key-4')
            ids.push('key-right-shift')
            break
        }
        case '%': {
            ids.push('key-5')
            ids.push('key-right-shift')
            break
        }
        case '^': {
            ids.push('key-6')
            ids.push('key-left-shift')
            break
        }
        case '&': {
            ids.push('key-7')
            ids.push('key-left-shift')
            break
        }
        case '*': {
            ids.push('key-8')
            ids.push('key-left-shift')
            break
        }
        case '(': {
            ids.push('key-9')
            ids.push('key-left-shift')
            break
        }
        case ')': {
            ids.push('key-0')
            ids.push('key-left-shift')
            break
        }
        case '-': {
            ids.push('key-dash')
            break
        }
        case '_': {
            ids.push('key-dash')
            ids.push('key-left-shift')
            break
        }
        case '=': {
            ids.push('key-equals')
            break
        }
        case '+': {
            ids.push('key-equals')
            ids.push('key-left-shift')
            break
        }
        case '[': {
            ids.push('key-square-bracket-open')
            break
        }
        case '{': {
            ids.push('key-square-bracket-open')
            ids.push('key-left-shift')
            break
        }
        case ']': {
            ids.push('key-square-bracket-close')
            break
        }
        case '}': {
            ids.push('key-square-bracket-close')
            ids.push('key-left-shift')
            break
        }
        case ';': {
            ids.push('key-semicolon')
            break
        }
        case ':': {
            ids.push('key-semicolon')
            ids.push('key-left-shift')
            break
        }
        case '\'': {
            ids.push('key-single-quote')
            break
        }
        case '\"': {
            ids.push('key-single-quote')
            ids.push('key-left-shift')
            break
        }
        case ',': {
            ids.push('key-coma')
            break
        }
        case '<': {
            ids.push('key-coma')
            ids.push('key-left-shift')
            break
        }
        case '.': {
            ids.push('key-dot')
            break
        }
        case '>': {
            ids.push('key-dot')
            ids.push('key-left-shift')
            break
        }
        case '/': {
            ids.push('key-slash')
            break
        }
        case '?': {
            ids.push('key-slash')
            ids.push('key-left-shift')
            break
        }
        case ' ': {
            ids.push('key-space')
            break
        }
        default: {
            if (symbol.toLowerCase() !== symbol) {
                let key = document.querySelector('#key-' + symbol.toLowerCase())
                if (key.classList.contains('left-hand-key')) {
                    ids.push('key-' + symbol.toLowerCase())
                    ids.push('key-right-shift')
                } else {
                    ids.push('key-' + symbol.toLowerCase())
                    ids.push('key-left-shift')
                }
            } else {
                ids.push('key-' + symbol)
            }
        }
    }

    let str = ''
    for (let i = 0; i < ids.length; i++) {
        if (i === ids.length - 1) {
            str += '#' + ids[i]
        } else {
            str += '#' + ids[i] + ', '
        }
    }

    return str
}

function selectLevel(i) {
    const levelElements = document.querySelectorAll('.level')

    levelElements.forEach(e => e.classList.remove('level--active'))

    levelElements[i].classList.add('level--active')
}

function onLevelClick(level, i) {
    selectLevel(i)
    loadLevel(i, levels)
    seperateToSpans(textElement)
    highlightText(textElement.querySelectorAll('span'), textFieldElement.value)
    highlightKey(textElement.textContent[textFieldElement.value.length])
}

function loadLevelMenu(levels, levelAvailability, onLevelClick) {
    const menu = document.querySelector('#levels')

    for (let i = 0; i < levels.length; i++) {
        let level = document.createElement('button')
        level.classList.add('level')
        if (levelAvailability[i]) {
            level.classList.add('level--completed')
        }
        level.textContent = 'level ' + (i + 1)
        menu.appendChild(level)
        level.addEventListener('click', () => {
            onLevelClick(level, i)
        })
    }
}

function updateLevelMenu(levelAvailability) {
    const levelElements = document.querySelectorAll('.level')

    levelElements.forEach((e, i) => {
        if (levelAvailability[i]) {
            e.classList.add('level--completed')
        }
    })
}

function showMessage(speed, levelSpeed, accuracy, levelAccuracy, isLastLevel) {
    const resultElement = document.querySelector('.result')
    resultElement.querySelector('#next-level').style.display = 'inline'

    document.querySelector('#user-wpm').textContent = speed
    document.querySelector('#level-wpm').textContent = levelSpeed
    document.querySelector('#user-accuracy').textContent = accuracy
    document.querySelector('#level-accuracy').textContent = levelAccuracy

    if (speed >= levelSpeed && accuracy >= levelAccuracy) {
        document.querySelector('.result-header').textContent = 'You won!'
        resultElement.classList.add('result--win')
    } else {
        document.querySelector('.result-header').textContent = 'You lost! Fucking loser!'
        resultElement.classList.add('result--lose')
    }

    if(isLastLevel) {
        resultElement.querySelector('#next-level').style.display = 'none'
    }
}

function hideMessage() {
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

function highlightText(letterElements, typedText) {
    for (let i = 0; i < letterElements.length; i++) {
        if (typedText[i]) {
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
            if (i == typedText.length) {
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

    for (let i = 0; i < text.length; i++) {
        res += '<span>' + text[i] + '</span>'
    }

    element.innerHTML = res
}

function loadLevel(index, levels) {
    document.querySelector('#text').textContent = levels[index].text
    document.querySelector('#text-field').value = ''
}