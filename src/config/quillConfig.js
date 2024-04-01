import Quill from 'quill';
import 'quill/dist/quill.snow.css'; 

class ArticleDropdown {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options;

        if (options.articles && options.articles.length > 0) {
            this.container = document.createElement('select');
            this.container.className = 'ql-article';
            this.container.innerHTML = '<option value="">Insert Article Link</option>';

            options.articles.forEach(article => {
                const option = document.createElement('option');
                option.value = article._id;
                option.innerText = article.title;
                this.container.appendChild(option);
            });

            this.container.onchange = () => {
                if (this.container.value) {
                    const range = this.quill.getSelection();
                    if (range && range.length > 0) {
                        const articleId = this.container.value;
                        const baseUrl = window.location.origin; 
                        const link = `${baseUrl}/wiki/${options.portalId}/article/${articleId}`;
    
                        this.quill.formatText(range.index, range.length, 'link', link, Quill.sources.USER);
    
                        this.container.value = ''; 
                    }
                }
            };

            const toolbar = quill.getModule('toolbar');
            toolbar.addHandler('articleDropdown', this.valueChanged);
            toolbar.container.appendChild(this.container);
        }
    }

    valueChanged() {
        // Handler logic if needed
    }
}

Quill.register('modules/articleDropdown', ArticleDropdown);

const modules = {
    toolbar: {
        container: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            ['clean'],
            ['link'],
            ['articleDropdown']
        ],
    },

    articleDropdown: {
        articles: [], 
        portalId: '' 
    }
};

const formats = [
    'bold', 'italic', 'underline', 'strike',
    'blockquote',
    'list', 'bullet', 'indent',
    'link'
];

export { modules, formats };