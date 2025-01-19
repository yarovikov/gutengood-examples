@extends('layouts.app')

@section('content')
  @while(have_posts()) @php(the_post())
    @includeIf(['partials.content-page'])
  @endwhile
@endsection
