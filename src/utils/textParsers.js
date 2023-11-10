import React from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
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


