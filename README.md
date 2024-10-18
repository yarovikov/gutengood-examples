### Requirements
[Acorn + Sage Wordpress Theme](https://roots.io)

### Installation
1. Install Gutengood package using composer

```
composer require yarovikov/gutengood
```

2. Place files from this repo in your Sage theme folder. Check and add yarn dependencies to build editor gutengood block components.
3. Run ```yarn```, then ```yarn build```
4. Enqueue editor assets if you don't have that
```
add_action('enqueue_block_editor_assets', function (): void {
    bundle('editor')->enqueue();
}, 100);
```

### Documentation
Check php part block examples here https://github.com/yarovikov/gutengood-examples/tree/master/app/Editor/Blocks.

#### Block Options

<img width="240" alt="" src="https://github.com/user-attachments/assets/db5d6c99-317f-4800-99c3-77617e71a4b0">

#### Block Fields
Use Edit Button to see editable components in the block

<img width="800" alt="" src="https://github.com/user-attachments/assets/381f549c-89aa-4bc0-bc8a-6dc0319d0411">

<img width="800" alt="" src="https://github.com/user-attachments/assets/d8466f71-8610-4dd7-86d9-a898912f4b2d">

You can use components for options and sidebar. But i don't recommend using RichText in the sidebar because of its floating panel.

Example of options:
```php
public function options(): array
{
  $builder = new GutengoodBuilder();

  $builder
    ->addText('title', [
      'label' => __('Block title', 'sage'),
    ])
    ->addSelect('title_tag', [
      'label' => __('Title tag', 'sage'),
      'choices' => [
        [
          'label' => 'h1',
          'value' => 'h1',
        ],
        [
          'label' => 'h2',
          'value' => 'h2',
        ],
    ],
    'value' => 'h2', // default value
  ]);

  return $builder->build();
}
```

Also possible to add the same components in the repeater:

<img width="600" alt="" src="https://github.com/user-attachments/assets/a2c60247-3c3d-47c4-bbc3-d8f36b4d626a">

#### Make Options Sections

<img width="240" alt="" src="https://github.com/user-attachments/assets/348b267c-423d-4672-904f-9e8948ca9a0f">

```php
$builder
  ->addSection('Basic Options', [
      'open' => true,
  ])
  ->addRange('width', [
      'label' => __('Block width', 'sage'),
      'value' => 900,
  ])
  ->endSection()
  ->addSection('Colors')
  ->addColorPalette('bg_color', [
      'label' => __('BG Color', 'sage'),
      'colors' => [
          [
              'name' => 'black',
              'color' => '#000',
              'slug' => 'black',
          ],
      ],
  ])
  ->endSection();
```

#### Conditional logic show/hide components

Curently work only with Select and Toggle. Example:
```php
$builder
  ->addToggle('is_video')
  ->addText('video_id')
  ->conditional('is_video', true); // video_id field will be displayed if the video toggle checkbox is checked
```

#### Block Data
Pass your data (fields and options) to the block view
```php
public function getBlockData(array $attributes, string $content): array
{
  $data = [
    'items' => array_filter(array_map(fn(array $item): ?array => !empty($item['title']) ? $item : null, (array) ($attributes['items'] ?? []))),
    'width' => (int) ($attributes['width'] ?? 900),
  ];

  return [...parent::getBlockData($attributes, $content), ...$data];
}
```

#### Block Assets
Front-end block assets
```php
public function getAssets(): array
{
  return [
    [
      'handle' => 'gallery',
      // optional: conditional logic
      'condition' => fn(array $block): bool => !empty($block['attrs']['is_slider']) || !empty($block['attrs']['is_lightbox']),
    ],
  ];
}
```
If you need additional external dependencies:
```php
public function getAssets(): array
{
  return [
    [
      'handle' => 'payment-form',
      'dependencies' => ['cloudpayments-widget'], // before register this script in your theme
      'condition' => fn(array $block): bool => true === is_user_logged_in(), // optional
    ],
  ];
}
```

You don't need block js for register for the editor. But if needed you can set $editor_script like this
```js
public bool $editor_script = true;
```
Then add your custom jsx. [Example](https://github.com/yarovikov/gutengood-examples/blob/master/resources/scripts/editor/blocks/container.block.js) 

---

Also you can add this code to your editor.css to avoid redundant margins in the options sidebar
```css
.block-editor-block-inspector {
  .components-base-control {
    @apply !mb-0;
  }
}
```