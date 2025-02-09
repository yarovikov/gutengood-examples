@extends('layouts.app')

@section('content')

  @if (! have_posts())
    {!! __('Sorry, but the page you are trying to view does not exist.', 'sage') !!}
  @endif

  @while(have_posts()) @php(the_post())
    @includeIf('partials.content-' . get_post_type())
  @endwhile

@endsection

@section('sidebar')
  @include('sections.sidebar')
@endsection
