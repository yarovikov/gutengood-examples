<section id="{{ $block_id ?? '' }}" class="{{ $block_class ?? '' }}">
  @unless(empty($block_styles))
    {!! $block_styles !!}
  @endunless

  <div class="container px-5 mx-auto flex flex-col gap-6">

    @unless(empty($title))
      <h1 class="text-3xl text-center">{!! esc_html($title) !!}</h1>
    @endunless

    @unless(empty($text))
      <div class="text-center max-w-[600px] mx-auto">
        {!! esc_html($text) !!}
      </div>
    @endunless

    @unless(empty($posts))
      <div class="container grid md:grid-cols-3 gap-8 lg:gap-4">
        @foreach($posts as $post)
          @includeIf('loop.post', $post)
        @endforeach
      </div>
    @else
      <div class="text-center">
        Noooo 😢
      </div>
    @endunless

  </div>

</section>
