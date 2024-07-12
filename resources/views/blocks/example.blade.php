<section
        id="{{ $block_id ?? '' }}"
        class="{{ $block_class ?? '' }} container"
        style="background-color:{{ $bg_color ?? 'transparent' }};width:{{ $width ?? '900' }}px"
>
    @unless(empty($block_styles))
        {!! $block_styles !!}
    @endunless
    @if(!empty($title) && true === ($show_title))
        <h2 class="mb-4">
            {!! esc_html($title) !!}
        </h2>
    @endif
    @unless(empty($image))
        {!! wp_get_attachment_image($image, 'large') !!}
    @endunless
</section>
