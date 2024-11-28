# Vanilla-JavaScript
>[!TIP]
>Vanilla JavaScript refers to using plain JavaScript without relying on any libraries, frameworks, or plugins like React, Angular, or jQuery. It’s the pure, unmodified version of JavaScript that runs directly in the browser.

### Key Features of Vanilla JavaScript:
- Native JavaScript: All functionality is implemented using the core language features provided by JavaScript.
- Lightweight: No extra files or dependencies are included, making it lightweight and efficient.
- Browser Compatibility: Since it doesn't rely on third-party tools, Vanilla JavaScript can be used to create solutions that work across multiple browsers.
- Direct DOM Manipulation: Tasks such as selecting elements, handling events, or modifying the DOM are done manually using native JavaScript APIs like document.querySelector(), addEventListener(), and appendChild().

### Why Use Vanilla JavaScript?
- Performance: It's faster since there's no overhead from libraries or frameworks.
- Learning Fundamentals: It helps developers understand the core concepts of JavaScript before diving into frameworks.
- Full Control: Developers have complete control over their code without constraints imposed by frameworks.
- Reduced Complexity: For simple tasks or small projects, Vanilla JavaScript avoids unnecessary complexity.

Example:
Here's a simple example of Vanilla JavaScript to change the text of an element:
```javascript
document.getElementById('myButton').addEventListener('click', function() {
    document.getElementById('myText').textContent = 'Hello, Vanilla JavaScript!';
});
```
In contrast, a library like jQuery might simplify the above code but adds extra dependencies. Using Vanilla JavaScript keeps your application lightweight and more self-contained.
