<?php

// calculator shortcode
add_shortcode( 'blexr_bet_calculator', 'blexr_bet_calculator_callback' );
function blexr_bet_calculator_callback( $atts ) {
    return calculatorHtml();
}