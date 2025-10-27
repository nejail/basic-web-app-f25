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

    test('should find numbers that are both square and cube', () => {
        const query = "Which of the following numbers is both a square and a cube: 3969, 1, 4635, 2187, 4052, 64, 1316?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("1, 64");
    })
});
