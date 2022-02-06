<?php

// calculator html function
function calculatorHtml() {
    return '
    <div class="calculator-container">
        <div class="pre-description">
            <p>Enter the Stake and Odds for your bet and the Bet Calculator will automatically calculate the Payout. Add Odds for Multiples.</p>
        </div>
        <div class="calculator-fields">
            <div class="odd_format">
                <label>Selected Odds Format:</label>
                <select name="odds_format" id="odds_format" class="odd_format">
                    <option value="american">American</option>
                    <option value="decimal">Decimal</option>
                    <option value="fractional">Fractional</option>
                </select>
            </div>
            <div class="fields">
                <div class="stake w-50">
                    <label for="">Stake</label>
                    <input type="text" id="stake" name="stake">
                </div>
                <div class="odds w-50">
                    <label for="">Odds</label>
                    <div id="odds-container">
                        <div class="single-odd">
                            <input type="text" class="odds" name="odds[]">
                        </div>
                    </div>
                    <button id="add-odds">Add Odds</button>
                    <button id="clear">Clear</button>
                </div>
            </div>
            <div class="payouts-container">
                <label for="">Payout</label>
                <div id="payout-output">
                    <span id="currency">$</span>
                    <span id="amount">0</span>
                </div>
            </div>
        </div>
    </div>
    ';
}

function bet_calculator_gutenberg_block() {
    wp_register_script('sports-odd-table',plugin_dir_url( __FILE__ ).'assets/js/gutenberg_custom_blocks.js',array('wp-blocks'));
    register_block_type('blexr/sports-odd-data-table',array(
        'editor_script' => 'sports-odd-table'
    ));
}
add_action('init','bet_calculator_gutenberg_block');