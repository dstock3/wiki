import React from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function parseContentToComponents(content, references = []) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    function processNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.nodeValue;
            const referenceRegex = /\[(\d+)\]/g;
            let lastIndex = 0;
            let result;

            const textElements = [];
            while ((result = referenceRegex.exec(text)) !== null) {
                const index = result.index;
                const referenceIndex = parseInt(result[1], 10) - 1; 

                console.log(`Found reference: [${result[1]}], Index in array: ${referenceIndex}`);

                textElements.push(text.substring(lastIndex, index));

                if (referenceIndex >= 0 && referenceIndex < references.length) {
                    textElements.push(
                        <a href={`#reference-${referenceIndex + 1}`} key={`ref-${referenceIndex + 1}`}>
                            [{referenceIndex + 1}]
                        </a>
                    );
                } else {
                    textElements.push(`[${referenceIndex + 1}]`);
                }
                
                lastIndex = referenceRegex.lastIndex;
            }

            textElements.push(text.substring(lastIndex));
            return textElements;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'BR') {
                return React.createElement('br', { key: Math.random().toString() });
            }
            if (node.tagName === 'A') {
                const href = node.getAttribute('href');
                if (href.startsWith('/')) {
                    return <Link to={href} key={Math.random().toString()}>{Array.from(node.childNodes).map(child => processNode(child))}</Link>;
                } else {
                    return <a href={href} target="_blank" rel="noopener noreferrer" key={Math.random().toString()}>{Array.from(node.childNodes).map(child => processNode(child))}</a>;
                }
            }
            return React.createElement(
                node.tagName.toLowerCase(),
                { key: Math.random().toString() },
                Array.from(node.childNodes).map(child => processNode(child))
            );
        }
    }

    const elements = Array.from(doc.body.childNodes).map(node => processNode(node));
    return elements;
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

function abridgeReactContent(elements, limit) {
  let accumulatedLength = 0;

  function traverse(element) {
      if (accumulatedLength >= limit) {
          return null;
      }

      if (typeof element === 'string') {
          accumulatedLength += element.length;
          if (accumulatedLength > limit) {
              const truncatedLength = element.length - (accumulatedLength - limit);
              return element.slice(0, truncatedLength).trim() + '...';
          }
          return element;
      }

      if (React.isValidElement(element)) {
          if (element.props.children) {
              const newChildren = React.Children.map(element.props.children, child => {
                  return traverse(child);
              }).filter(child => child !== null);

              if (newChildren.length === 0) {
                  return null;
              }

              return React.cloneElement(element, {...element.props, key: Math.random().toString()}, newChildren);
          }
          return element;
      }
  }

  return elements.map(element => traverse(element)).filter(element => element !== null);
}
  
export { formatDate, parseContentToComponents, abridgeReactContent };


