function parseContentToHTML(content) {
    const articleLinkRegex = /\[\[PortalID:\s*([^|]+)\s*\|\s*ArticleID:\s*([^|]+)\s*\|\s*([^\]]+)\]\]/g;
    const referenceLinkRegex = /\[(\d+)\]/g;

    content = content.replace(articleLinkRegex, (match, portalId, articleId, displayText) => {
        return `<a href="/${portalId}/article/${articleId}">${displayText}</a>`;
    });

    content = content.replace(referenceLinkRegex, (match, referenceNumber) => {
        return `<a class="reference-link" href="#reference-${referenceNumber}">[${referenceNumber}]</a>`;
    });
    const contentWithParsedLinks = ensureLinksAreAbsolute(content);

    return contentWithParsedLinks;
}
function ensureLinksAreAbsolute(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    
    doc.querySelectorAll('a').forEach(anchor => {
        const href = anchor.getAttribute('href');
        anchor.setAttribute('href', ensureAbsoluteURL(href));
    });

    return doc.body.innerHTML;
}

function ensureAbsoluteURL(url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    } else {
        return 'http://' + url;
    }
}

export { parseContentToHTML };


