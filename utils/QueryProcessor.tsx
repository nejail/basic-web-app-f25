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

  if (/what is .*plus/i.test(lowerQuery)) {
    const numbers = query.match(/-?\d+/g);
    if (numbers && numbers.length >= 2) {
      const sum = numbers.reduce(
        (total, value) => total + parseInt(value, 10),
        0
      );
      return sum.toString();
    }
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

  const powerMatch = query.match(
    /what is (\-?\d+)\s*(?:to the power of|power of|raised to(?: the power of)?)\s*(\-?\d+)/i
  );
  if (powerMatch) {
    const [, baseValue, exponentValue] = powerMatch;
    const exponent = BigInt(exponentValue);
    if (exponent < 0n) {
      return "Cannot raise to a negative power";
    }
    const base = BigInt(baseValue);
    let result = 1n;
    let current = base;
    let remaining = exponent;
    while (remaining > 0n) {
      if (remaining % 2n === 1n) {
        result *= current;
      }
      current *= current;
      remaining /= 2n;
    }
    return result.toString();
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

  const isPrime = (value: number) => {
    if (value <= 1 || !Number.isInteger(value)) {
      return false;
    }
    if (value === 2) {
      return true;
    }
    if (value % 2 === 0) {
      return false;
    }
    const limit = Math.floor(Math.sqrt(value));
    for (let divisor = 3; divisor <= limit; divisor += 2) {
      if (value % divisor === 0) {
        return false;
      }
    }
    return true;
  };

  if (lowerQuery.includes("prime")) {
    const primeMatch = query.match(/prime[^:]*:(.*)/i);
    const primeSource =
      primeMatch && primeMatch[1] !== ""
        ? primeMatch[1]
        : query;
    const numbers = extractNumbers(primeSource);
    const primes = numbers.filter(isPrime);

    if (primes.length > 0) {
      return primes.join(", ");
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
