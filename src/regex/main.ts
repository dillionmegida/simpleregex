import handleBegins from "./handlers/begins"
import handleCharacterClass from "./handlers/characterclass"
import handleMetaChar from "./handlers/metacharacters"

export default function explainRegex(str: string): string {
  const strItems = str.split("")
  let currentLabel: "characterclass" | "metacharacter" | "normal" | "none" =
    "none"

  let currentShouldItBreak = false
  let currentShouldItTab = false
  const tabStr = "&nbsp;&nbsp;&nbsp;&nbsp;"

  try {
    let explanation = ""

    let position = 0

    const beginsWith = position === 0

    let prefixString = beginsWith ? "A substring begins with" : "followed by"

    while (position < strItems.length) {
      const char = strItems[position]
      let handle

      switch (char) {
        case "$":
          if (position === 0) {
            handle = handleBegins(str, position)
            // currentShouldItBreak = handle.shouldBreak
            // explanation = `${prefixString} ${handle.explanation}`
            explanation = `The string begins with:<br/>${tabStr}`
            currentShouldItBreak = true
            currentShouldItTab = true
            prefixString = ""
            break
          }

        // else, fall-through

        case "\\":
          // this should be a metacharacter
          handle = handleMetaChar(str, position)
          currentLabel = "metacharacter"

          position = handle.newPosition
          explanation += `${currentShouldItBreak ? "<br/>" : ""}${
            currentShouldItTab ? tabStr : ""
          }${prefixString} ${handle.explanation}`
          prefixString = "followed by "
          break

        case "[":
          // this should be a character class
          handle = handleCharacterClass(str, position)
          currentLabel = "characterclass"

          position = handle.newPosition
          explanation += `${currentShouldItBreak ? "<br/>" : ""}${
            currentShouldItTab ? tabStr : ""
          } ${handle.explanation}`
          prefixString = "followed by "
          break

        default:
          // handle other characters
          console.log(currentLabel)

          explanation +=
            currentLabel === "normal" ? `, ${char}` : `${prefixString} ${char}`

          currentLabel = "normal"
          prefixString = "followed by "
      }

      position++
    }

    return explanation
  } catch (err) {
    return err.message
  }
}
