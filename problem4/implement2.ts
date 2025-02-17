// Implementation 2: Using mathematical formula (Gauss's formula)
/**
 * Calculates the sum of all integers from 1 to n using Gauss's formula
 * @param n - Any integer
 * @returns The sum of all integers from 1 to n
 * @example
 * sum_to_n_b(5) // returns 15 (1 + 2 + 3 + 4 + 5)
 * sum_to_n_b(3) // returns 6 (1 + 2 + 3)
 * @complexity Time complexity: O(1) - Constant time
 * @remarks
 * Pros: Extremely efficient, input size independent
 * Cons: Might be less intuitive for those unfamiliar with the formula
 */
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}
