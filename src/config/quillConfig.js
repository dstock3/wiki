const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // Text formatting
        ['blockquote'], // Blockquotes
        [{ 'list': 'ordered'}, { 'list': 'bullet' }], // Lists
        [{ 'indent': '-1'}, { 'indent': '+1' }], // Indentation
        ['clean'], // Remove formatting
        ['link'] // Links
    ],
};

const formats = [
    'bold', 'italic', 'underline', 'strike',
    'blockquote',
    'list', 'bullet', 'indent',
    'link'
];

export { modules, formats };
