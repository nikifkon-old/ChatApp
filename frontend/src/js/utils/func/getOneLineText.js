const wordWidth = 7.6
const end = ' ...'

export default function getOneLineText(text, id) {
  let width = getBlockWidth(id)
  if (!width) {
    return text
  }

  let textWidth = getTextWidth(text)
  if (textWidth > width) {
    width -= 6 // with ` ...` on end
    while (textWidth > width) {
      text = popLastWord(text)
      textWidth = getTextWidth(text)
    }
    return text + end
  } else {
    return text
  }
}

function getBlockWidth(id) {
  if (!id) {
    return null 
  }
  let el = document.getElementById(id)
  if (!el) {
    return null
  }
  return el.clientWidth
}

function getTextWidth(text) {
  return text.length * wordWidth
}

function popLastWord(text) {
  return text.split(' ').slice(0, -1).join(' ')
}
