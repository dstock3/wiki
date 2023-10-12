function parseContentToHTML(content) {
    const articleLinkRegex = /\[\[PortalID:\s*([^|]+)\s*\|\s*ArticleID:\s*([^|]+)\s*\|\s*([^\]]+)\]\]/g;
    const referenceLinkRegex = /\[(\d+)\]/g;

    content = content.replace(articleLinkRegex, (match, portalId, articleId, displayText) => {
        return `<a href="/${portalId}/article/${articleId}">${displayText}</a>`;
    });

    content = content.replace(referenceLinkRegex, (match, referenceNumber) => {
        return `<a class="reference-link" href="#reference-${referenceNumber}">[${referenceNumber}]</a>`;
    });

    return content;
}

export { parseContentToHTML };
