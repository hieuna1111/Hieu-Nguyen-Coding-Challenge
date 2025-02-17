/**
 * Calculates the sum of all integers from 1 to n using a for loop
 * @param n - Any integer
 * @returns The sum of all integers from 1 to n
 * @example
 * sum_to_n_a(5) // returns 15 (1 + 2 + 3 + 4 + 5)
 * sum_to_n_a(3) // returns 6 (1 + 2 + 3)
 * @complexity Time complexity: O(n) - Linear time
 * @remarks
 * Pros: Easy to understand, straightforward implementation
 * Cons: Not efficient for large n as it requires n iterations
 */
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
