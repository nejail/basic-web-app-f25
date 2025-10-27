export default function QueryProcessor(query: string): string {
  const lowerQuery = query.toLowerCase();

  const extractNumbers = (list: string) =>
    list
      .split(/,|\s+/)
      .map((value) => value.trim())
      .map((value) => value.replace(/[^\d-]/g, ""))
      .filter((value) => value !== "" && !Number.isNaN(Number(value)))
      .map((value) => Number(value));

  if (lowerQuery.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  const multiplicationMatch = query.match(
    /what is (\-?\d+)\s*(?:multiplied by|times)\s*(\-?\d+)/i
  );
  if (multiplicationMatch) {
    const [, firstNumber, secondNumber] = multiplicationMatch;
    const product = parseInt(firstNumber, 10) * parseInt(secondNumber, 10);
    return product.toString();
  }

  const additionMatch = query.match(/what is (\-?\d+) plus (\-?\d+)/i);
  if (additionMatch) {
    const [, firstNumber, secondNumber] = additionMatch;
    const sum = parseInt(firstNumber, 10) + parseInt(secondNumber, 10);
    return sum.toString();
  }

  const subtractionMatch = query.match(/what is (\-?\d+)\s*minus\s*(\-?\d+)/i);
  if (subtractionMatch) {
    const [, firstNumber, secondNumber] = subtractionMatch;
    const difference = parseInt(firstNumber, 10) - parseInt(secondNumber, 10);
    return difference.toString();
  }

  const divisionMatch = query.match(/what is (\-?\d+)\s*(?:divided by|over)\s*(\-?\d+)/i);
  if (divisionMatch) {
    const [, firstNumber, secondNumber] = divisionMatch;
    const divisor = parseInt(secondNumber, 10);
    if (divisor === 0) {
      return "Cannot divide by zero";
    }
    const quotient = parseInt(firstNumber, 10) / divisor;
    return quotient.toString();
  }

  const largestMatch = query.match(/largest:(.*)/i);
  if (largestMatch) {
    const numbers = extractNumbers(largestMatch[1]);

    if (numbers.length > 0) {
      const largest = Math.max(...numbers);
      return largest.toString();
    }
  }

  const squareCubeMatch = query.match(/square[^:]*cube(?:\s*:)?(.*)/i);
  const squareCubeSource =
    squareCubeMatch && squareCubeMatch[1] !== ""
      ? squareCubeMatch[1]
      : lowerQuery.includes("square") && lowerQuery.includes("cube")
      ? query
      : null;

  if (squareCubeSource) {
    const numbers = extractNumbers(squareCubeSource);
    const perfectSixths = numbers.filter((value) => {
      if (value < 0) {
        return false;
      }
      const sixthRoot = Math.round(Math.pow(value, 1 / 6));
      return Math.pow(sixthRoot, 6) === value;
    });

    if (perfectSixths.length > 0) {
      return perfectSixths.join(", ");
    }
  }

  if (lowerQuery.includes("name")) {
    return "Nasser";
  }

  if (lowerQuery.includes("andrewid")) {
    return "nejail";
  }

  if (lowerQuery.includes("age")) {
    return "20";
  }

  return "";
}
