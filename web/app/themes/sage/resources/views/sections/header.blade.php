<header class="site-header">
  <div class="container">
    <div class="flex items-center gap-3 justify-between">
      <nav class="header-nav">
        @foreach($nav_items as $nav_item)
          <li class="{{ true === ($nav_item->current ?? false) ? 'current' : '' }}">
            <a href="{{ $nav_item->url }}">
              {!! esc_html($nav_item->title ?? '') !!}
            </a>
          </li>
        @endforeach
      </nav>
      <a target="_blank" rel="nofollow noopener noreferrer" href="https://github.com/yarovikov/gutengood-examples">
        @svg('github', 'w-5 text-stone-500')
      </a>
    </div>
  </div>
</header>
