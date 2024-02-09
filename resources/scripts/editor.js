roots.register.blocks(`./editor/`);
roots.register.formats(`./editor/`);
roots.register.variations(`./editor/`);
roots.register.plugins(`./editor/`);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error);
}
