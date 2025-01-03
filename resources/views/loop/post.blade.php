<div class="border p-4 flex flex-col gap-2">
  @if(!empty($image) && false === ($is_hide_images ?? false))
    <div class="relative aspect-video overflow-hidden">
      {!! wp_get_attachment_image($image, 'medium', false, ['class' => 'w-full !h-full object-cover absolute', 'alt' => $title ?? '']) !!}
    </div>
  @endif
  <div class="text-stone-500 text-sm">
    {!! esc_html($date ?? '') !!}
  </div>
  <div class="text-xl">
    {!! esc_html($title ?? '') !!}
  </div>
  <div class="text-sm leading-tight text-stone-800">
    {!! esc_html($text ?? '') !!}
  </div>
  <a href="{{ $url ?? '' }}" class="w-fit text-sky-700 border-b border-sky-700 mb-6 lg:mb-0 hover:border-transparent">
    {!! esc_html__('Read more') !!}
  </a>
</div>
