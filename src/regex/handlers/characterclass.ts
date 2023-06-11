export default function handleCharacterClass(str: string, position: number) {
  let dupPosition = position
  let strItems = str.split("")

  const char = strItems[dupPosition]
  const nextChar = strItems[dupPosition + 1]

  const isNegated = nextChar === "^"
  if (isNegated) dupPosition++

  let explanation = position
    ? `<br/><br/>${
        isNegated ? "not followed by any of " : "followed by either "
      }`
    : `${isNegated ? "Does not begin " : "Begins "} with `

  const checkForClosingBracketRegex = /[^\]]+\]/
  const restOfTheString = str.substring(dupPosition + 1)

  if (nextChar === "]") {
    throw new Error(
      `Character class at position ${dupPosition} and ${
        dupPosition + 1
      } cannot be empty`
    )
  }

  if (isNegated && strItems[dupPosition + 1] === "]") {
    const positionOfOpenBracket = isNegated ? dupPosition - 1 : dupPosition
    const positionOfCloseBracket = dupPosition + 1

    throw new Error(
      `Negated character class at position ${positionOfOpenBracket} and ${positionOfCloseBracket} cannot be empty`
    )
  }

  if (!checkForClosingBracketRegex.test(restOfTheString)) {
    // then there is no closing bracket
    const positionOfOpenBracket = isNegated ? dupPosition - 1 : dupPosition
    throw new Error(
      `${
        isNegated ? "Negated c" : "C"
      }haracter class at position ${positionOfOpenBracket} does not have a closing bracket`
    )
  }

  dupPosition++

  while (dupPosition < strItems.length) {
    if (strItems[dupPosition] === "]") break

    explanation += `${strItems[dupPosition]}`
    const nextAfterThis = strItems[dupPosition + 1]

    if (nextAfterThis !== undefined && nextAfterThis !== "]")
      explanation += " or "

    dupPosition++
  }

  return { explanation, newPosition: dupPosition }
}
