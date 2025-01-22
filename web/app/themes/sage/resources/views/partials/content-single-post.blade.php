<article @php(post_class('h-entry'))>
  <header>
    <h1 class="">
      {!! $title !!}
    </h1>
  </header>

  <div class="entry-content">
    @php(the_content())
  </div>
</article>
