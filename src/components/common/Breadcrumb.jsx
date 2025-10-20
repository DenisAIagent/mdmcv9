import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import '../../assets/styles/breadcrumb.css';

const Breadcrumb = ({ items }) => {
  // Schema BreadcrumbList pour optimisation IA
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url ? `https://www.mdmcmusicads.com${item.url}` : undefined
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <nav className="breadcrumb" aria-label="Navigation fil d'Ariane" itemScope itemType="https://schema.org/BreadcrumbList">
        <ol className="breadcrumb-list">
          {items.map((item, index) => (
            <li
              key={index}
              className={`breadcrumb-item ${index === items.length - 1 ? 'current' : ''}`}
              itemScope
              itemType="https://schema.org/ListItem"
              itemProp="itemListElement"
            >
              {item.url && index !== items.length - 1 ? (
                <Link to={item.url} itemProp="item">
                  <span itemProp="name">{item.name}</span>
                </Link>
              ) : (
                <span itemProp="name" className="current-page">{item.name}</span>
              )}
              <meta itemProp="position" content={index + 1} />
              {index < items.length - 1 && (
                <span className="breadcrumb-separator" aria-hidden="true">→</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;