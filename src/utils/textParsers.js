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

function abridgeHTMLContent(string, limit) {
    const parser = new DOMParser();
    const serializer = new XMLSerializer();
    const doc = parser.parseFromString(string, 'text/html');
    let accumulatedLength = 0;
  
    function traverse(node) {
      if (accumulatedLength >= limit) {
        node.remove();
        return;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        accumulatedLength += node.nodeValue.length;
        if (accumulatedLength > limit) {
          
          const lastSpaceIndex = node.nodeValue.lastIndexOf(' ', node.nodeValue.length - (accumulatedLength - limit));
          if (lastSpaceIndex !== -1) {
            node.nodeValue = node.nodeValue.substring(0, lastSpaceIndex);
          }
          
          node.nodeValue = node.nodeValue.replace(/[\s,]+$/, '') + '...';
        }
      } else {
        const babies = Array.from(node.childNodes);
        for (let baby of babies) {
          traverse(baby);
        }
      }
    }
  
    traverse(doc.body);
    return serializer.serializeToString(doc.body);
}
  
export { parseContentToHTML, abridgeHTMLContent };


