const Image = require('@11ty/eleventy-img');

// https://www.11ty.dev/docs/plugins/image/#use-this-in-your-templates
async function imageShortcode(src, alt, sizes) {

  // Set default values 
  sizes = sizes || "100vw"; 
  alt = alt || ""; 

  let metadata = await Image(src, {
    widths: [300, 600, 900, 1200],
    formats: ["jpeg"], 
    
    // https://www.11ty.dev/docs/plugins/image/#output-directory
    outputDir: "./_site/img/"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) { 
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  // Copy assets directory 
  // https://www.11ty.dev/docs/copy/#manual-passthrough-file-copy-(faster)
  eleventyConfig.addPassthroughCopy('assets'); 
}
