<section id="{{ $block_id ?? '' }}" class="{{ $block_class ?? '' }} container">

  {{-- Use $is_editor to prevent of visibility in the editor (when use RichText for example) --}}
  {{-- You can use components in the sidebar instead of the editor to avoid these checks) --}}
  @if(false === $is_editor)

    @if(true === $show_title && !empty($title))
      <h2>
        {!! esc_html($title) !!}
      </h2>
    @endif

    @unless(empty($text))
      @wpautokp($text)
    @endunless

  @endif

</section>
