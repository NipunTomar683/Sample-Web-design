# Maison Solenne

Maison Solenne is a responsive, single-page restaurant website concept. Its editorial design pairs a warm, seasonal color palette with glassmorphism, CSS 3D details, and subtle motion.

## Overview

The page introduces the restaurant, highlights menu items, describes the dining experience, and provides a table-request form.

### Features

- Responsive navigation with links to the story, menu, experience, and reservation sections
- Glassmorphism panels and CSS-generated 3D visual accents
- Featured-dish carousel with six menu items, moving left to right
- GSAP entrance and scroll-triggered reveal animations
- Locomotive Scroll integration with a native-scroll fallback if its libraries fail to load
- Reduced-motion support
- Reservation request form with required-field validation and a minimum date of today

## Run locally

No build step or package installation is required:

1. Download or clone this repository.
2. Open `index.html` in a modern browser.

Google Fonts, GSAP, ScrollTrigger, and Locomotive Scroll are loaded from external CDNs, so an internet connection is needed for those assets and enhanced scrolling animations. The page itself remains a static HTML file.

## Reservation form

The form demonstrates client-side validation and displays a confirmation prompt to call the restaurant. It does not submit requests to a server or create actual reservations.
