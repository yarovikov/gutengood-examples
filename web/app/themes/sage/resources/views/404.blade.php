@extends('layouts.app')

@section('content')
  @if (! have_posts())
    {!! __('Sorry, but the page you are trying to view does not exist.', 'sage') !!}
  @endif
@endsection
