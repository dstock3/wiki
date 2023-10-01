import { Link } from 'react-router-dom';

function parseArticleLinksToJSX(content) {
    const linkRegex = /\[\[PortalID:\s*([^|]+)\s*\|\s*ArticleID:\s*([^|]+)\s*\|\s*([^\]]+)\]\]/g;
    let lastEndIndex = 0;
    const jsxResult = [];
    
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
        const textBeforeLink = content.substring(lastEndIndex, match.index);
        if (textBeforeLink) {
            jsxResult.push(textBeforeLink);
        }
        
        const portalId = match[1];
        const articleId = match[2];
        const displayText = match[3];

        jsxResult.push(
            <Link key={match.index} to={`/${portalId}/article/${articleId}`}>
                {displayText}
            </Link>
        );
        
        lastEndIndex = match.index + match[0].length;
    }
    
    const textAfterLastLink = content.substring(lastEndIndex);
    if (textAfterLastLink) {
        jsxResult.push(textAfterLastLink);
    }
    
    return jsxResult;
}

export { parseArticleLinksToJSX };

