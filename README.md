Here's an updated `README.md` that reflects the fact that users do not need to add an additional button, as the script includes a floating button:

```markdown
# Maya Widget

The Maya Widget is a customizable modal widget that you can easily integrate into your website by adding a single script. It provides a sleek, responsive design using Tailwind CSS.

## Demo

Check out a live demo of the Maya Widget [here](https://vin-jex.github.io/maya-script/).

## Features

- Simple integration with a single script
- Responsive and modern design
- Customizable content and styles
- Interactive modal with a floating action button

## Installation

To integrate the Maya Widget into your website, follow these steps:

### Step 1: Include the Script

Add the following script tag to the `<body>` section of your HTML file:

```html
  <script src="https://vin-jex.github.io/maya-script/maya.js"></script>
```

### Full Example

Here’s a complete example of how your HTML might look:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Example Website</title>
</head>

<body>

  <!-- Include the Widget Script -->
  <script src="https://vin-jex.github.io/maya-script/maya.js"></script>

</body>

</html>
```

## Customization

You can customize the Maya Widget by modifying the CSS and HTML within the `maya.js` script. Here are a few examples:

### Change Background Color

To change the background color of the modal, you can modify the CSS in the script:

```css
.modal-content {
  background-color: #f0f0f0;
}
```

### Update Content

To update the content of the modal, such as the text or images, modify the corresponding HTML within the script:

```html
<div class="modal-messages">
  <div class="message message-left">
    <img src="your-image-url.jpg" alt="Maya" class="message-img">
    <p class="message-text">Your custom message here.</p>
  </div>
</div>
```

## Troubleshooting

If the widget is not working as expected, consider the following steps:

1. **Check Network Requests:**
   - Open your browser's developer tools (usually by pressing F12 or right-clicking and selecting "Inspect").
   - Go to the "Network" tab and reload the page.
   - Ensure that the script is being loaded successfully.

2. **Console Errors:**
   - Check the browser console for any JavaScript errors.
   - Make sure there are no syntax errors in your `maya.js` file.

3. **Resource Loading:**
   - Ensure that any external resources (images, fonts, etc.) are accessible and correctly linked.

## License

The Maya Widget is open-source and available under the MIT License. You are free to use, modify, and distribute it as needed.

---

By following these instructions, you can easily integrate the Maya Widget into your website and customize it to fit your needs. If you encounter any issues or have questions, please feel free to reach out for support.