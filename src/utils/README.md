# Utilities

This directory serves as a collection of utility functions that are commonly used throughout the project. Utility functions are designed to perform common tasks that can be reused in different parts of the application, promoting code reusability and maintainability.

## Common Utility Functions

Some examples of utility functions that might be included in this directory are:

- **String manipulation**: Functions to format, parse, or transform strings.
- **Date and time utilities**: Functions to handle date and time operations.
- **Array and object operations**: Functions to manipulate arrays and objects.
- **Math utilities**: Functions to perform common mathematical operations.
- **Validation functions**: Functions to validate input data.

## Example Utility Function

Here is an example of a simple utility function that capitalizes the first letter of a string:

```ts
// utils/stringUtils.js

/**
 * Pads a number with leading zeros until it reaches the specified minimum length.
 *
 * @param num - The number to pad.
 * @param min - The minimum length of the padded number.
 * @returns The padded number as a string.
 */
export function padf(num: number, min: number): string {
    return num.toLocaleString("en-US", { minimumFractionDigits: min });
}
```
