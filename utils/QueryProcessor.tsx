export default function QueryProcessor(query: string): string {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  const additionMatch = query.match(/what is (\-?\d+) plus (\-?\d+)/i);
  if (additionMatch) {
    const [, firstNumber, secondNumber] = additionMatch;
    const sum = parseInt(firstNumber, 10) + parseInt(secondNumber, 10);
    return sum.toString();
  }

  const largestMatch = query.match(/largest:(.*)/i);
  if (largestMatch) {
    const numbers = largestMatch[1]
      .split(/,|\s+/)
      .map((value) => value.trim())
      .map((value) => value.replace(/[^\d-]/g, ""))
      .filter((value) => value !== "" && !Number.isNaN(Number(value)))
      .map((value) => Number(value));

    if (numbers.length > 0) {
      const largest = Math.max(...numbers);
      return largest.toString();
    }
  }

  if (lowerQuery.includes("name")) {
    return "Nasser";
  }


  if (lowerQuery.includes("andrewid")){
    return "nejail";
  }

  if (lowerQuery.includes("age")){
    return "20";
  }

  return "";
}
