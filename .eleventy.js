module.exports = function(eleventyConfig) {
  // Kopiuj pliki statyczne
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/images");

  // Wlasny typ wpisow: wywiady
  eleventyConfig.addCollection("wywiadyCollection", function(collectionApi) {
    const items = collectionApi
      .getAll()
      .filter((item) => {
        const normalized = item.inputPath.replace(/\\/g, "/");
        return normalized.includes("src/content/wywiady/") && normalized.endsWith(".md");
      })
      .sort((a, b) => b.date - a.date);
    return items;
  });

  // Ustawienia obserwowania plikow
  eleventyConfig.setWatchThrottleWaitTime(100);

  // Konfiguracja katalogow
  return {
    dir: {
      input: "src",
      output: "public",
      includes: "includes",
      data: "data",
      layouts: "layouts"
    },
    pathPrefix: "/",
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
