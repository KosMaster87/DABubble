# PHP Coding Style & Conventions

This document outlines the coding standards for our PHP projects. All contributions should adhere to these guidelines to ensure code consistency, readability, and maintainability.

## General Principles

- **Language**: All code, comments, and documentation must be in German (de-DE).
- **PHP Version**: The project targets PHP 8.1 or newer. Utilize modern PHP features appropriately.
- **Strict Types**: Always enable strict typing by starting every PHP file with `declare(strict_types=1);`.

## File and Code Structure

- **One Task Per Function**: Each function must have a single, clear responsibility.
- **Function Length**: Functions should not exceed 20 lines of code (excluding comments and signature).
- **Decomposition**: Split complex logic into smaller, private helper functions.
- **No Nested Functions**: Do not define functions inside other functions.

## Naming Conventions

- **Functions**: Use `camelCase` for function names (e.g., `calculateTotalAmount`).
- **Variables**: Use `camelCase` for variable names (e.g., `$userName`).
- **Constants**: Use `UPPER_SNAKE_CASE` for constants (e.g., `define('MAX_CONNECTIONS', 100);`).
- **Classes**: Use `PascalCase` for class names (e.g., `class UserSession { ... }`).

## Typing

- **Strict Typing**: Use scalar type declarations (`int`, `float`, `string`, `bool`, `array`) for all function arguments, properties, and return types.
- **Return Types**: Every function must have an explicit return type. Use `: void` for functions that do not return a value.
- **Nullable Types**: Use nullable types (`?string`) where a `null` value is permissible.

## Comments & Documentation

- **PHPDoc**: All functions, classes, and properties must have a PHPDoc block.
- **Clarity**: Comments should explain *why* something is done, not *what* is being done.
- **Tags**: Use `@param`, `@return`, `@throws`, and `@internal` for helper functions not intended for public use.

## Best Practices

- **Arrow Functions**: Use arrow functions (`fn() => ...`) only for simple, single-expression callbacks (e.g., in `array_map`, `array_filter`). For multi-line logic, use standard anonymous functions or private helper methods.
- **Constants over Magic Values**: Do not use "magic values". Define them as constants with a clear name.
- **Error Handling**: Use exceptions for error handling instead of returning `false` or `null` where possible.
