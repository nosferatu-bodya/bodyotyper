
import levels from './levels.js'

loadLevel(0, levels)

function loadLevel (index, levels) {
    document.querySelector('#text').textContent = levels[index].text
    document.querySelector('#text-field').value = ''
}