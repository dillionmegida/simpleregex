export default function handleBegins(str: string, position: number) {
  if (position !== 0 || str[0] !== "$")
    throw new Error("Not a valid beginnning pattern")

  const explanation = "The string begins with:"

  return {
    explanation,
    shouldBreak: true,
  }
}
