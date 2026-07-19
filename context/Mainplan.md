# Project Name

**NewSphere** 

## Description

A responsive news aggregation website built with **Node.js** that automatically retrieves and displays news from multiple free APIs. Visitors can browse, search, and read summaries without creating an account. The website is fully automated and requires no manual content management.

---

# Development Methodology

We'll develop the project in **10 phases**.

Each phase should produce a working application.

---

# PHASE 1 — Project Initialization

## Objective

Prepare the development environment and create the project structure.

---

## Tasks

### Initialize Node.js

```bash
npm init -y
```

---

### Install Dependencies

```bash
npm install express axios cors dotenv
```

Development tools

```bash
npm install -D nodemon
```

---

### Configure Scripts

```json
"scripts": {
    "start":"node server/server.js",
    "dev":"nodemon server/server.js"
}
```

---

### Create Project Structure

```text
news-hub/

client/

server/

README.md

.env

.gitignore
```

---

### Configure Environment Variables

```env
PORT=3000

NEWS_API_KEY=

GNEWS_API_KEY=

NEWSDATA_API_KEY=
```

---

## Deliverables

* Node project created
* Packages installed
* Folder structure ready
* Git repository initialized

---

# PHASE 2 — Frontend UI Development

## Objective

Build the complete user interface using mock data.

No backend yet.

---

## Pages

### Home

Contains

* Sidebar
* Featured Story
* Trending News
* Latest Cards

---

### Article Page

Displays

* Image
* Headline
* Source
* Date
* Description
* Read Original

---

### Category Page

Shows

Technology

Sports

Business

Science

Entertainment

---

### Search Page

Displays

Search bar

Results Grid

---

### 404 Page

Custom page.

---

## Components

### Sidebar

Contains

```
Logo

Home

World

Technology

Sports

Business

Entertainment

Science

Health

Search
```

---

### Hero

Contains

```
Large Image

Breaking Badge

Headline

Description

Read More
```

---

### Trending

Contains

```
Image

Headline

Time

Source
```

---

### Latest Cards

Each card contains

```
Thumbnail

Category

Headline

Description

Time

Source
```

---

## Responsive Design

Desktop

Tablet

Mobile

---

## Deliverables

A responsive website with placeholder content.

---

# PHASE 3 — Express Server

## Objective

Create the backend server.

---

## Tasks

Create

```
server.js
```

Configure

* Express
* CORS
* Static Files
* Environment Variables

---

### Routes

```
GET /

GET /api/home

GET /api/category

GET /api/search

GET /api/article
```

---

## Deliverables

Working Express server.

---

# PHASE 4 — API Provider Layer

## Objective

Separate every news provider.

Folder

```
providers/

newsapi.js

gnews.js

newsdata.js
```

Each provider

* Builds URL
* Sends Request
* Validates Response
* Returns JSON

Never mix APIs together.

---

## Example

```
newsapi.js

↓

fetch()

↓

articles[]
```

---

## Deliverables

Every API works independently.

---

# PHASE 5 — News Service Layer

## Objective

Merge all news providers into one response.

Folder

```
services/

newsService.js
```

Responsibilities

* Call every provider
* Merge articles
* Remove duplicates
* Sort newest first
* Remove incomplete articles
* Return clean data

---

## Example

```
NewsAPI

GNews

NewsData

↓

NewsService

↓

One Article List
```

---

## Deliverables

Unified news collection.

---

# PHASE 6 — Homepage API

## Objective

Populate your layout dynamically.

Endpoint

```
GET /api/home
```

Returns

```json
{
  "featured": {},
  "trending": [],
  "latest": [],
  "categories": {
    "technology": [],
    "sports": [],
    "business": [],
    "science": [],
    "entertainment": []
  }
}
```

---

## Homepage Population

### Featured Story

Largest image

Newest headline

---

### Trending

Top five headlines

---

### Latest

Newest articles

---

### Bottom Cards

One article from each category

---

## Deliverables

Homepage becomes dynamic.

---

# PHASE 7 — Article System

## Objective

Open article details.

When user clicks

```
Technology Card
```

Display

```
Image

Headline

Description

Source

Author

Published

Read Original →
```

Important:

Your site **does not copy the full article**. Most news APIs only allow summaries and require users to visit the original publisher for the complete story.

---

## Deliverables

Article page.

---

# PHASE 8 — Category System

## Objective

Automatically organize articles.

Categories

```
Technology

Business

Sports

Entertainment

Science

World

Health
```

Endpoint

```
GET /api/category/:category
```

Example

```
/api/category/technology
```

---

## Deliverables

Category pages.

---

# PHASE 9 — Search System

## Objective

Search all loaded articles.

Endpoint

```
GET /api/search?q=AI
```

Search

* Title
* Description
* Source

Features

* Live Search
* Instant Results
* No Results State

---

## Deliverables

Search completed.

---

# PHASE 10 — UI Enhancements

## Objective

Improve the user experience.

### Add

Loading Skeletons

Error States

Dark Mode

Breaking News Banner

Relative Time

Smooth Animations

Hover Effects

Back To Top Button

Lazy Loaded Images

Responsive Sidebar

Article Share Button

API Status Indicator

"Last Updated" Timestamp

Fallback image when an API provides no thumbnail.

---

# Folder Structure

```text
news-hub/
│
├── client/
│   ├── index.html
│   ├── article.html
│   ├── category.html
│   ├── search.html
│   ├── css/
│   │   ├── main.css
│   │   ├── sidebar.css
│   │   ├── hero.css
│   │   ├── cards.css
│   │   ├── article.css
│   │   ├── category.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── api.js
│   │   ├── home.js
│   │   ├── article.js
│   │   ├── category.js
│   │   ├── search.js
│   │   └── ui.js
│   └── images/
│
├── server/
│   ├── server.js
│   ├── routes/
│   │   ├── home.routes.js
│   │   ├── article.routes.js
│   │   ├── category.routes.js
│   │   └── search.routes.js
│   ├── controllers/
│   │   ├── home.controller.js
│   │   ├── article.controller.js
│   │  ├── category.controller.js
│   │  └── search.controller.js
│   ├── services/
│   │   └── news.service.js
│   ├── providers/
│   │   ├── newsapi.provider.js
│   │   ├── gnews.provider.js
│   │   └── newsdata.provider.js
│   ├── middleware/
│   │   └── errorHandler.js
│   └── utils/
│       ├── deduplicate.js
│       ├── normalize.js
│       └── time.js
│
├── .env
├── package.json
└── README.md
```

# Final System Workflow

```text
                    USER
                      │
                      ▼
              Home Page (UI)
                      │
             GET /api/home
                      │
                      ▼
             Express.js Backend
                      │
         ┌────────────┼────────────┐
         ▼            ▼            ▼
     NewsAPI      GNews      NewsData.io
         │            │            │
         └────────────┼────────────┘
                      ▼
          Normalize & Validate Data
                      ▼
            Remove Duplicate Articles
                      ▼
          Group by Category & Trending
                      ▼
              Return Clean JSON
                      ▼
               Render Your Layout
```

## Suggested Timeline

| Week  | Focus                            | Goal                                                      |
| ----- | -------------------------------- | --------------------------------------------------------- |
| **1** | Project setup + UI               | Responsive homepage with your custom layout               |
| **2** | Express server + first API       | Display live news from one provider                       |
| **3** | Multiple APIs + normalization    | Merge and organize articles consistently                  |
| **4** | Categories, search, article page | Complete core functionality                               |
| **5** | Polish and deployment            | Responsive refinements, dark mode, error handling, deploy |

This plan keeps your project **database-free**, modular, and aligned with your custom layout while following a clean Node.js architecture that can be extended later if needed.
