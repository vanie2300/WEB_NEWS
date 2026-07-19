NEWSSPHERE DEVELOPMENT PLAN

Project Overview

Project Name:
NewsSphere

Project Type:
API-Powered News Aggregation Website

Project Description:
NewsSphere is a responsive web application that automatically retrieves news articles from multiple free news APIs and presents them in a clean, modern, and user-friendly interface. The platform is designed as a news aggregator, not a news publisher. It does not require users to create accounts, log in, or manage content manually. All content is retrieved dynamically from external APIs.

Project Goals

Create a professional-looking news website.

Automatically retrieve articles from multiple free news APIs.

Display categorized news with a featured hero section and trending panel.

Provide fast searching and filtering.

Maintain a clean, scalable, and modular codebase.

Provide multiple customizable UI themes.

Require no database.

Require no user authentication.

Prioritize responsiveness, accessibility, and performance.

Technology Stack

Frontend
HTML5
CSS3
Vanilla JavaScript (ES6 Modules)

Backend
Node.js
Express.js

HTTP Client
Axios

Environment Variables
dotenv

Development Tools
Nodemon

Version Control
Git

Hosting
Frontend: Vercel or Netlify
Backend: Render or Railway

Storage
No database
No CMS
No admin panel

Application Architecture

The browser sends requests to the Express server.

The Express server communicates with multiple news APIs.

Each provider retrieves its own articles.

The backend normalizes every response into one common structure.

Duplicate articles are removed.

The data is grouped into categories.

The backend returns clean JSON to the frontend.

The frontend renders the data using reusable UI components.

There is no permanent storage.

Every request retrieves fresh news from the providers.

Project Folder Structure

news-sphere

client

css

themes

variables.css

themes.css

layout.css

sidebar.css

header.css

hero.css

cards.css

article.css

search.css

footer.css

utilities.css

animations.css

responsive.css

js

app.js

api.js

home.js

article.js

category.js

search.js

theme.js

ui.js

utils.js

images

icons

pages

article.html

category.html

search.html

404.html

index.html

server

config

routes

controllers

providers

services

middleware

utils

server.js

.env

.gitignore

README.md

Phase 1

Project Initialization

Objectives

Create the project.

Initialize Node.js.

Install required packages.

Create folder structure.

Configure Git.

Configure environment variables.

Configure development scripts.

Expected Result

A running Node.js application with an organized project structure.

Phase 2

Design System

Objectives

Build a centralized design system.

Nothing inside the project should use hardcoded colors, spacing, typography, border radius, or animation values.

Everything must use global design variables.

Create design tokens for:

Colors

Typography

Spacing

Border Radius

Shadows

Animation Speed

Container Width

Breakpoints

Icon Sizes

Component Heights

Button Sizes

Input Sizes

Card Sizes

Sidebar Width

Header Height

Footer Height

Image Aspect Ratios

Z-index Layers

Expected Result

Changing one value automatically updates the entire application.

Phase 3

Theme Engine

Objectives

Create a dynamic theme engine.

The application should support unlimited theme presets.

The active theme should be switchable without changing component styles.

Default Themes

Classic

Dark

Midnight

Ocean

Emerald

Forest

Sunset

Rose

Lavender

Slate

Newspaper

High Contrast

Each theme defines

Primary Color

Secondary Color

Accent Color

Background

Surface

Sidebar

Header

Footer

Card Background

Card Hover

Text

Secondary Text

Borders

Links

Buttons

Input Fields

Hover Colors

Success

Warning

Danger

Focus Ring

Scrollbar

Selection Color

Expected Result

A complete visual redesign is possible by changing only the active theme.

Phase 4

Frontend Layout

Objectives

Build the full responsive layout.

The homepage contains

Header

Sidebar

Hero Section

Trending Panel

Latest News Grid

Footer

No live data.

Use mock content.

Responsive Requirements

Desktop

Permanent sidebar

Large hero

Trending panel

Five-column news grid

Tablet

Collapsible sidebar

Hero full width

Trending below hero

Two or three-column grid

Mobile

Hamburger navigation

Sticky header

Single-column layout

Touch-friendly spacing

Expected Result

Complete responsive UI.

Phase 5

Reusable Components

Objectives

Build reusable UI components.

Components include

Sidebar

Header

Search Bar

Hero Card

Trending Item

News Card

Category Badge

Source Badge

Buttons

Inputs

Dropdown

Modal

Toast

Loading Skeleton

Error Message

Empty State

Pagination

Breadcrumb

Footer

All components should use the design system.

Expected Result

Consistent UI throughout the application.

Phase 6

Express Backend

Objectives

Create Express server.

Configure routing.

Serve frontend files.

Configure middleware.

Create REST endpoints.

Routes

GET /

GET /api/home

GET /api/article

GET /api/category/:name

GET /api/search

Expected Result

Working backend.

Phase 7

News Provider Layer

Objectives

Create one provider for each API.

Each provider only communicates with one API.

Providers

NewsAPI

GNews

NewsData.io

Currents

MediaStack

Responsibilities

Create request URL

Send request

Validate response

Return articles

Handle errors

Expected Result

Each provider works independently.

Phase 8

News Service

Objectives

Create the central news service.

Responsibilities

Call every provider.

Merge responses.

Normalize articles.

Remove duplicates.

Remove invalid articles.

Sort newest first.

Group by category.

Group trending articles.

Prepare homepage response.

Expected Result

Unified collection of news articles.

Phase 9

Homepage Integration

Objectives

Replace mock data.

Populate

Hero

Trending

Latest

Category Sections

Sidebar statistics

API status

Last updated time

Expected Result

Homepage displays live news.

Phase 10

Category System

Objectives

Create dynamic category pages.

Supported Categories

World

Technology

Business

Sports

Entertainment

Science

Health

Politics

Environment

Each page displays

Hero article

Latest articles

Trending articles

Expected Result

Fully dynamic categories.

Phase 11

Article Page

Objectives

Create article details page.

Display

Image

Headline

Summary

Source

Author

Published Time

Category

Original URL

Related Articles

Expected Result

Professional article layout.

Phase 12

Search System

Objectives

Search across all retrieved articles.

Search fields

Title

Description

Source

Category

Features

Instant search

Search suggestions

Highlighted keywords

No results message

Expected Result

Fast client-side search.

Phase 13

Loading States

Objectives

Improve perceived performance.

Implement

Skeleton cards

Skeleton hero

Skeleton sidebar

Skeleton trending

Image placeholders

Lazy loading

Expected Result

Smooth loading experience.

Phase 14

Error Handling

Objectives

Handle every failure gracefully.

Scenarios

No internet

API unavailable

Rate limit exceeded

Missing image

Missing author

Empty category

Invalid search

404

500

Timeout

Expected Result

Application never crashes visually.

Phase 15

Accessibility

Objectives

Meet accessibility standards.

Requirements

Semantic HTML

Keyboard navigation

ARIA labels

Focus indicators

Accessible contrast

Responsive text

Screen reader support

Expected Result

Accessible application.

Phase 16

Performance Optimization

Objectives

Optimize speed.

Tasks

Lazy-load images

Minimize JavaScript

Reduce layout shifts

Debounce search

Optimize rendering

Reuse DOM elements

Compress assets

Expected Result

Fast application.

Phase 17

Animations

Objectives

Add subtle interactions.

Animations

Card hover

Button press

Sidebar transition

Theme transition

Fade in

Slide up

Modal

Dropdown

Toast

Loading shimmer

Expected Result

Modern interface.

Phase 18

Responsive Optimization

Objectives

Perfect responsiveness.

Desktop

Large monitors

Laptop

Tablet

Mobile

Landscape

Portrait

Expected Result

Pixel-perfect layout.

Phase 19

Final Polish

Objectives

Improve visual quality.

Tasks

Check spacing

Improve typography

Balance whitespace

Verify alignment

Improve shadows

Improve hover effects

Improve empty states

Improve loading states

Improve transitions

Expected Result

Production-ready interface.

Phase 20

Deployment

Objectives

Prepare production build.

Tasks

Optimize assets

Configure environment variables

Deploy backend

Deploy frontend

Verify API connections

Test responsiveness

Test themes

Test accessibility

Expected Result

Live production website.

Future Expansion

Although not included in Version 1, the architecture should allow future implementation of:

Local bookmarks using browser storage

Remember selected theme

Multiple languages

Progressive Web App

Offline support

RSS feeds

Weather widget

Breaking news ticker

Push notifications

Reading history

Trending analytics

Additional news providers

AI-powered article summaries

Voice search

Advanced filtering

Infinite scrolling

Share functionality

Custom homepage layout

Developer Goals

Maintain clean and modular code.

Avoid duplicated logic.

Separate frontend and backend responsibilities.

Use reusable components.

Use centralized design tokens.

Never hardcode colors or spacing.

Write maintainable code that is easy to extend.

Ensure every new feature follows the established design system and architecture. This will allow NewsSphere to scale from a simple news aggregator into a more feature-rich platform without requiring major structural changes.
