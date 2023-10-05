import { Link } from 'react-router-dom';

function parseContentToJSX(content) {
    const articleLinkRegex = /\[\[PortalID:\s*([^|]+)\s*\|\s*ArticleID:\s*([^|]+)\s*\|\s*([^\]]+)\]\]/g;
    const referenceLinkRegex = /\[(\d+)\]/g;

    let lastEndIndex = 0;
    const jsxResult = [];

    const matches = [];
    let match;

    while ((match = articleLinkRegex.exec(content)) !== null) {
        matches.push({ type: 'article', match });
    }
    while ((match = referenceLinkRegex.exec(content)) !== null) {
        matches.push({ type: 'reference', match });
    }

    matches.sort((a, b) => a.match.index - b.match.index);

    matches.forEach(({ type, match }) => {
        const textBeforeLink = content.substring(lastEndIndex, match.index);
        if (textBeforeLink) {
            jsxResult.push(textBeforeLink);
        }

        if (type === 'article') {
            const portalId = match[1];
            const articleId = match[2];
            const displayText = match[3];

            jsxResult.push(
                <Link key={match.index} to={`/${portalId}/article/${articleId}`}>
                    {displayText}
                </Link>
            );
        } else if (type === 'reference') {
            const referenceNumber = match[1];

            jsxResult.push(
                <Link className="reference-link" key={match.index} to={`#reference-${referenceNumber}`}>
                    [{referenceNumber}]
                </Link>
            );
        }

        lastEndIndex = match.index + match[0].length;
    });

    const textAfterLastLink = content.substring(lastEndIndex);
    if (textAfterLastLink) {
        jsxResult.push(textAfterLastLink);
    }

    return jsxResult;
}

export { parseContentToJSX };
