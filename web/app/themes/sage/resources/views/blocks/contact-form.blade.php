<section id="{{ $block_id ?? '' }}" class="{{ $block_class ?? '' }}">
  @unless(empty($block_styles))
    {!! $block_styles !!}
  @endunless

  @unless(empty($text))
    <div class="mb-6">
      {!! esc_html($text) !!}
    </div>
  @endunless

  <form method="post" enctype="multipart/form-data">

    <fieldset class="user_name">
      <label for="user_name">{!! __('Name', 'site') !!}*</label>
      <input name="user_name" type="text" id="user_name" value="">
    </fieldset>

    <fieldset class="user_email">
      <label for="user_email">{!! __('E-mail', 'site') !!}*</label>
      <input name="user_email" type="email" id="user_email" value="">
    </fieldset>

    <fieldset class="message">
      <label for="message">{!! __('Message', 'site') !!}*</label>
      <textarea name="message" id="message" class="h-[140px]"></textarea>
    </fieldset>

    <button class="btn-primary" type="submit">
      {!! __('Send', 'site') !!}
    </button>

    <input name="action" type="hidden" value="ajax_contact_form">
    {!! wp_nonce_field( 'ajax_contact_form_nonce', 'nonce', false, false ) !!}
  </form>

</section>
