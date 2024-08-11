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

You don't need block js for register for the editor. But if needed you can set $editor_script like this
```
public bool $editor_script = true;
```
Then add your custom jsx. Example https://github.com/yarovikov/gutengood-examples/blob/master/resources/scripts/editor/blocks/container.block.js.

#### Block Options
Add components for sidebar in your Block.php.

<img width="272" alt="Screenshot 2024-08-05 at 11 36 00" src="https://github.com/user-attachments/assets/f2dec0b6-138d-4eb2-8d15-35a412b980d1">

Available components and parameters:

```
public function options(): array
    {
        return [
            [
                'name' => 'title',
                'type' => 'Text',
                'label' => __('Block Title', 'sage'),
                'value' => '', // default value
            ],
            [
                'name' => 'title_tag',
                'type' => 'Select',
                'label' => __('Title Tag', 'sage'),
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
                'value' => 'h1', // default value
            ],
            [
                'name' => 'text',
                'type' => 'Textarea',
                'label' => __('Block Text', 'sage'),
                'value' => '',
            ],
            [
                'name' => 'width',
                'type' => 'Range',
                'label' => __('Block width', 'sage'),
                'value' => 900,
                'min' => 400,
                'max' => 2000,
                'step' => 20,
            ],
            [
                'name' => 'bg_color',
                'type' => 'ColorPalette',
                'label' => __('BG Color', 'sage'),
                'colors' => [
                    [
                        'name' => 'white',
                        'color' => '#ffffff',
                        'slug' => 'white',
                    ],
                    [
                        'name' => 'black',
                        'color' => '#000000',
                        'slug' => 'black',
                    ],
                ],
                'value' => '#ffffff', // default value
            ],
            [
                'name' => 'show_image',
                'type' => 'Toggle',
                'label' => __('Show Image?', 'sage'),
                'value' => false,
            ],
            [
                'name' => 'image',
                'type' => 'Image',
                'label' => __('Image', 'sage'),
                // show/hide option depend on show_image option (working with Toggle and Select)
                'condition' => [
                    'name' => 'show_image',
                    'value' => true,
                ],
            ],
        ];
    }
```

#### Block Fields
Only RichText or Repeater.

##### RichText
```
public function fields(): array
    {
        return [
            [
                'name' => 'text',
                'type' => 'RichText',
            ],
        ];
    }
```
##### Repeater
Repeater must contain an array of fields. The same components are available as for the options + RichText.

```
public function fields(): array
    {
        return [
            [
                'name' => 'items',
                'type' => 'Repeater',
                'fields' => [
                    [
                        'name' => 'image',
                        'type' => 'Image',
                        'label' => 'Image',
                    ],
                    [
                        'name' => 'title',
                        'type' => 'Text',
                        'label' => 'Title',
                    ],
                    [
                        'name' => 'text',
                        'type' => 'RichText',
                        'placeholder' => 'Text...',
                    ],
                ],
            ],
        ];
    }
```
Use Edit Button to see fields in the block

<img width="469" alt="Screenshot 2024-08-05 at 11 49 12" src="https://github.com/user-attachments/assets/04b74319-2a07-48bb-a338-6273cb2e16cf">

<img width="627" alt="Screenshot 2024-08-05 at 11 49 34" src="https://github.com/user-attachments/assets/e52da1e8-4696-45b1-aa7a-93770db9649a">

#### Block Data
Pass your data (fields and options) to the block view 
https://github.com/yarovikov/gutengood-examples/blob/master/app/Editor/Blocks/Faq.php#L15-L23
```
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
```
public function getAssets(): array
    {
        return [
            [
                'handle' => 'gallery',
                // optional: condition logic
                'condition' => fn(array $block): bool => !empty($block['attrs']['is_slider']) || !empty($block['attrs']['is_lightbox']),
            ],
        ];
    }
```
If you need additional external dependencies:
```
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
