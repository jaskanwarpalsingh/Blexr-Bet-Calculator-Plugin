const { registerBlockType } = wp.blocks;

// new gutenberg block with name "Sports Odd Data Table"
registerBlockType('blexr/sports-odd-data-table', {
    title: 'Sports Odd Data Table',
    description: 'Table representing the latest odds records',
    category: 'media',
    attributes:{},
    edit() {
        return wp.element.createElement( 'div', '', 'Sports Odd Data Table' );
    },
    save() {
        return wp.element.createElement( 'div', '', 'Sports Odd Data Table' );
    }
});