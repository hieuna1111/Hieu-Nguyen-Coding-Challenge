/**
 * Calculates the sum of all integers from 1 to n using recursion
 * @param n - Any integer
 * @returns The sum of all integers from 1 to n
 * @example
 * sum_to_n_c(5) // returns 15 (1 + 2 + 3 + 4 + 5)
 * sum_to_n_c(3) // returns 6 (1 + 2 + 3)
 * @complexity Time complexity: O(n) - Linear time
 * Space complexity: O(n) - Due to recursive call stack
 * @remarks
 * Pros: Clean and readable code, demonstrates recursive approach
 * Cons:
 * - Consumes stack memory for each recursive call
 * - Can cause stack overflow with very large n
 * - Less efficient than iterative or mathematical approaches
 */
function sum_to_n_c(n: number): number {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
}
