<?php
/**
 * Plugin name: Blexr Bet Calculator
 * Author: Jaskanwarpal Singh
 * Description: Bet Calculator which allows bettors to calculate the potential Payout for any single bet and has a simple ‘Add Odds’ function to calculate the Payout for a multiple bet.
 * Version: 1.0
 */

define( 'BBCALC__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

require_once( BBCALC__PLUGIN_DIR . 'functions.php' );
require_once( BBCALC__PLUGIN_DIR . 'shortcodes.php' );

function calculator_widget_enqueue_script() {
    wp_enqueue_style( 'font_awesome', 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css' );
    wp_enqueue_style( 'calculator_style', plugin_dir_url( __FILE__ ) . 'stylesheets/style.css' );
    wp_enqueue_script( 'jquery-2.2.4', 'https://code.jquery.com/jquery-2.2.4.min.js' );
    wp_enqueue_script( 'calculator_functions', plugin_dir_url( __FILE__ ) . 'assets/js/functions.js' );
    wp_enqueue_script( 'calculator_script', plugin_dir_url( __FILE__ ) . 'assets/js/script.js' );
}
add_action('wp_enqueue_scripts', 'calculator_widget_enqueue_script');