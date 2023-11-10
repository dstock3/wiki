import React from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function parseContentToHTML(content) {
  const referenceLinkRegex = /\[(\d+)\]/g;

  content = content.replace(referenceLinkRegex, (match, referenceNumber) => {
      return `<a class="reference-link" href="#reference-${referenceNumber}">[${referenceNumber}]</a>`;
  });
  const contentWithParsedLinks = ensureLinksAreAbsolute(content);

  return DOMPurify.sanitize(contentWithParsedLinks);
}

function parseContentToComponents(content) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const elements = [];

  function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
          return node.nodeValue;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName === 'A') {
              const href = node.getAttribute('href');

              if (href.startsWith('/')) {
                  return <Link to={href}>{node.textContent}</Link>;
              } else {
                  return <a href={href} target="_blank" rel="noopener noreferrer">{node.textContent}</a>;
              }
          } else {
              return React.createElement(
                  node.tagName.toLowerCase(),
                  { key: Math.random().toString() },
                  Array.from(node.childNodes).map(child => processNode(child))
              );
          }
      }
  }

  Array.from(doc.body.childNodes).forEach(node => {
      elements.push(processNode(node));
  });

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
  
export { formatDate, parseContentToComponents, parseContentToHTML, abridgeHTMLContent };


