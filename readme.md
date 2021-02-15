# Gallery

This is a responsive template for creating easy to use galleries.
Just copy the code into your HTML page and customise the CSS variables as needed.

That's it!

## Instructions

1. Copy this small chunk of HTML into your work

```
  <section class="gallery">
    <div class="img_row"></div>
    <nav class="mid"></nav>
    <nav class="prev">&lt;</nav>
    <nav class="next">&gt;</nav>
  </section>
```

2. link your CSS file `<link rel="stylesheet" href="styles/styles.css">`

3. add these extra bits just before the end of your html file

```
  <style id="extra_style"></style>
  <style id="input_style"></style>
  <script src="scripts/hammer.min.js"></script>
  <script src="scripts/scripts.js"></script>
</body>
</html>
```

4. copy any CSS that contains the `.gallery` class into your CSS file, take care to include the styles within the @media query at the end as well

5. customise the CSS variables at the top of the CSS file with the relevant styles you'd like. Use the [Gallery Helper Tool](https://front-end-materials.github.io/gallery/) to find the right variables values

6. copy the full contents of the JavaScript file over as is

7. customise the list of images at the top of the file with the images you would like to feature in your gallery. The first string is the file name and the second string is the alt attribute, which is a short description of the image

```
const image_list = [
  ["imgs/img1.jpg", "Cold mountains from high above"],
  ["imgs/img2.jpg", "Flowers or leaves at night"],
  ["imgs/img3.jpg", "Abstract art"],
  ["imgs/img4.jpg", "Neon light in a bar"],
  ["imgs/img5.jpg", "Red cloud in sky"]
];
```

That's it!