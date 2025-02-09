export default async (app) => {
  app
    .entry('app', ['@scripts/app', '@styles/app'])
    .entry('editor', ['@scripts/editor', '@styles/editor'])
    .assets(['images']);

  app.postcss
    .setPlugin(`postcss-import`)
    .setPlugin(`tailwindcss/nesting`)
    .setPlugin(`tailwindcss`)
    .use(['postcss-import', 'tailwindcss/nesting', 'tailwindcss'])

  app.setPublicPath('/app/themes/sage/public/');

  app
    .setUrl('http://localhost:3000')
    .setProxyUrl('http://example.test')
    .watch(['resources/views', 'app']);
  
  app.wpjson
    .setSettings({
      color: {
        custom: false,
        customDuotone: false,
        customGradient: false,
        defaultDuotone: false,
        defaultGradients: false,
        defaultPalette: false,
        duotone: [],
      },
      custom: {},
      spacing: {},
      typography: {
        'fontFamilies': [],
        'customFontSize': false,
        'dropCap': false,
        'fontStyle': false,
        'fontWeight': false,
        'letterSpacing': false,
        'lineHeight': false,
        'textColumns': false,
        'textDecoration': false,
        'textTransform': false,
        'writingMode': false
      }
    })
    .enable();
};
