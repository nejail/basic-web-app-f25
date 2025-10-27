import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "Nasser"
          ));
    })

    test('should return age', () => {
        const query = "What is your age?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "20"
          ));
    })

    test('should return andrewid', () => {
        const query = "What is your andrewid?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "nejail"
          ));
    })

    test('should add two numbers', () => {
        const query = "What is 9 plus 47?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("56");
    })

    test('should find largest number from list', () => {
        const query = "Which of the following numbers is the largest: 79, 50, 96?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("96");
    })

    test('should multiply two numbers', () => {
        const query = "What is 77 multiplied by 71?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("5467");
    })

    test('should subtract two numbers', () => {
        const query = "What is 77 minus 71?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("6");
    })

    test('should divide two numbers', () => {
        const query = "What is 144 divided by 12?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("12");
    })

    test('should find numbers that are both square and cube', () => {
        const query = "Which of the following numbers is both a square and a cube: 3969, 1, 4635, 2187, 4052, 64, 1316?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("1, 64");
    })

    test('should handle alternate square and cube phrasing', () => {
        const query = "Which of the following numbers is both a square and a cube: 1739, 3249, 64, 157, 2351, 4096, 599?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("64, 4096");
    })

    test('should find square and cube numbers without colon', () => {
        const query = "Which of the following numbers is both a square and a cube 3202, 1951, 1, 474, 3262, 64, 1369?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("1, 64");
    })

    test('should find prime numbers from list', () => {
        const query = "Which of the following numbers are primes: 3202, 1951, 1, 474, 3262, 64, 1369, 17, 23?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("17, 23");
    })
});
