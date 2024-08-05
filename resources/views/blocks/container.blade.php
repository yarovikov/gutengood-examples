<section id="{{ $block_id ?? '' }}" class="{{ $block_class ?? '' }}">
    @unless(empty($block_styles))
        {!! $block_styles !!}
    @endunless
    <div class="container">
        <div class="mx-auto w-full" style="max-width: {{ $width ?? '900' }}px">
            <div class="entry-content">
                {!! $content ?? '' !!}
            </div>
        </div>
    </div>
</section>
