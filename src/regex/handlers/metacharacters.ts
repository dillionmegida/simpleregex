import {ALL_DIGITS, ALL_SPACES, ALL_LETTERS, ALL_SYMBOLS, UNDERSCORE} from './characters'


const META_CHARACTERS = {
  "\\d": {
    values: [...ALL_DIGITS],
    desc: "a digit meta character, which represents digits from 0 to 9",
  },
  "\\D": {
    values: [...ALL_LETTERS, ...ALL_SYMBOLS, ...ALL_SPACES],
    desc: "a non-digit meta character, which represents all ldigits",
  },
  "\\w": {
    values: [...ALL_LETTERS, ...ALL_DIGITS, UNDERSCORE],
    desc: "a word meta character, which represents all letters, digits and the underscore",
  },
  "\\W": {
    values: [...ALL_SYMBOLS, ...ALL_SPACES],
    desc: "a non-word meta character, which represents all symbols, and spaces",
  },
}

type ReturnValue = {
  explanation: string
  newPosition: number
}

export default function handleMetaChar(
  str: string,
  position: number
): ReturnValue {
  let dupPosition = position

  const strItems = str.split("")

  const char = str[dupPosition]
  dupPosition++
  const nextChar = strItems[dupPosition]

  if (nextChar === undefined) throw new Error("Expect a character after '\\'")

  const metaChar = `${char}${nextChar}`

  return {
    explanation: `${position ? "<br/><br/>followed by" : "Begins with"} ${
      META_CHARACTERS[metaChar].desc
    }`,
    newPosition: dupPosition,
  }
}
