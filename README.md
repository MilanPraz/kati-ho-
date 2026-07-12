# Kati Ho? — Nepal Product Price Comparison Platform

**Kati Ho?** is a Nepal-focused product price comparison backend built with **FastAPI**, **Scrapy**, **PostgreSQL**, **Redis**, and **Celery**.

The name **“Kati Ho?”** means **“How much is it?”** in Nepali. The platform helps users search and compare product prices from multiple Nepali tech/e-commerce stores before buying.

---

<img width="1571" height="907" alt="image" src="https://github.com/user-attachments/assets/fd81be40-9514-4485-b055-201524988d37" />


## Project Overview

Kati Ho? collects product pricing data from supported Nepali stores, normalizes the scraped product information, saves the latest useful data into PostgreSQL, and serves fast searchable APIs through FastAPI.

The system is designed with a production-style architecture:

```txt
FastAPI Product API
   ↓
Redis Cache
   ↓
PostgreSQL
```

For scraping:

```txt
FastAPI Scrape Endpoint
   ↓
Celery Task Queue
   ↓
Redis Broker
   ↓
Celery Worker
   ↓
Scrapy Spider
   ↓
Scrapy Pipeline
   ↓
PostgreSQL
   ↓
Clear Product Redis Cache
```

---

## Features

- FastAPI backend with versioned API routes
- PostgreSQL database integration
- SQLAlchemy ORM models
- Pydantic request/response schemas
- Product create API
- Product upsert logic using `store + product_url`
- Product list/search API
- Single product detail API
- Smart product search across brand, model, RAM, storage, variant, and store
- Scrapy spiders integrated inside the backend project
- Scrapy pipeline saves and updates products directly into PostgreSQL
- Celery + Redis background scraping queue
- Redis cache for product API responses
- Cache invalidation after scraping updates product data
- Aiven PostgreSQL compatible
- Docker-based Redis setup

---

## Current Supported Stores / Sources

The project currently includes spiders for:

- GadgetByte Nepal
- Hukut
- Yantra

More stores can be added later by creating new Scrapy spiders and enabling them in the scrape API.

---

## Tech Stack

| Layer | Technology |
|---|---|
| API Framework | FastAPI |
| Scraping | Scrapy |
| Database | PostgreSQL / Aiven PostgreSQL |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| Queue | Celery |
| Broker | Redis |
| Cache | Redis |
| Package Manager | uv |
| Migration Tool | Alembic |

---

## Folder Structure

```txt
kati-ho/
├── app/
│   ├── main.py
│   ├── db.py
│   ├── sync_db.py
│   ├── models.py
│   ├── schemas.py
│   ├── config.py
│   ├── cache.py
│   ├── utils.py
│   ├── celery_app.py
│   ├── routes/
│   │   ├── products.py
│   │   └── scrape.py
│   └── tasks/
│       ├── __init__.py
│       └── scrape_tasks.py
│
├── scraper/
│   ├── scrapy.cfg
│   └── price_comparison_nepal/
│       ├── spiders/
│       │   ├── gadgetbyte.py
│       │   ├── hukut.py
│       │   └── yantra.py
│       ├── items.py
│       ├── pipelines.py
│       ├── settings.py
│       ├── sources.py
│       └── utils.py
│
├── alembic/
├── docker-compose.yml
├── pyproject.toml
├── uv.lock
├── .env.example
└── README.md
```

---

## Architecture

### Product Search Flow

```txt
User searches product
   ↓
GET /api/v1/products?q=samsung s25
   ↓
FastAPI checks Redis cache
   ↓
If cached: return cached response
   ↓
If not cached: query PostgreSQL
   ↓
Save response in Redis for 5 minutes
   ↓
Return products
```

### Scraping Flow

```txt
Admin/System triggers scrape endpoint
   ↓
POST /api/v1/scrape/{spider_name}
   ↓
FastAPI queues Celery task
   ↓
Redis stores task
   ↓
Celery worker receives task
   ↓
Worker runs Scrapy spider
   ↓
Scrapy pipeline upserts products into PostgreSQL
   ↓
Product Redis cache is cleared
```

---

## API Endpoints

### Health / Root

```http
GET /
```

Returns basic API status.

---

### Product APIs

#### Get Products

```http
GET /api/v1/products/
```

Optional query parameters:

```txt
q        Search text, e.g. samsung f22 6gb
brand    Filter by brand
category Filter by category
source   Filter by store/source
```

Example:

```http
GET /api/v1/products/?q=samsung f22 6gb
```

---

#### Get Single Product

```http
GET /api/v1/products/{product_id}
```

---

#### Create Product

```http
POST /api/v1/products/
```

Example request body:

```json
{
  "store": "GadgetByte Nepal",
  "category": "Mobiles",
  "brand": "Samsung",
  "model_name": "Samsung Galaxy S25 Ultra",
  "variant": "12GB/256GB",
  "ram": "12GB",
  "storage": "256GB",
  "price": 184999,
  "price_text": "Rs. 184,999",
  "price_type": "exact",
  "currency": "NPR",
  "product_url": "https://example.com/samsung-s25-ultra",
  "source_url": "https://example.com/mobile-price-list",
  "in_stock": true
}
```

---

#### Upsert Product

```http
POST /api/v1/products/upsert
```

Upsert behavior:

```txt
If same store + product_url exists → update product
If not exists → create new product
```

This prevents duplicate products when spiders run multiple times.

---

### Scraping APIs

#### Trigger Spider

```http
POST /api/v1/scrape/{spider_name}
```

Example:

```http
POST /api/v1/scrape/gadgetbyte?category=mobiles&brand=samsung
```

Supported spiders:

```txt
gadgetbyte
hukut
yantra
```

The endpoint queues a background Celery task. It does not wait for scraping to finish.

---

#### Check Scrape Job Status

```http
GET /api/v1/scrape/jobs/{task_id}
```

Possible task statuses:

```txt
PENDING
STARTED
SUCCESS
FAILURE
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=postgresql+asyncpg://username:password@host:port/defaultdb?ssl=require
DATABASE_URL_SYNC=postgresql+psycopg://username:password@host:port/defaultdb?sslmode=require

CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/1
CACHE_REDIS_URL=redis://localhost:6379/2
PRODUCT_CACHE_TTL_SECONDS=300
```

Also create `.env.example` with the same keys but without real credentials.

Never commit your real `.env` file.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/kati-ho.git
cd kati-ho
```

### 2. Install dependencies

Using `uv`:

```bash
uv sync
```

Or add required packages manually:

```bash
uv add fastapi uvicorn sqlalchemy asyncpg psycopg redis celery scrapy python-dotenv alembic
```

### 3. Create `.env`

```bash
cp .env.example .env
```

Then update database and Redis credentials.

---

## Running the Project

### 1. Start Redis

```bash
docker compose up -d redis
```

Check Redis:

```bash
docker ps
```

Optional ping test:

```bash
docker exec -it price_compare_redis redis-cli ping
```

Expected output:

```txt
PONG
```

---

### 2. Run FastAPI

```bash
uvicorn app.main:app --reload
```

Open Swagger docs:

```txt
http://127.0.0.1:8000/docs
```

---

### 3. Run Celery Worker

On Windows development:

```bash
celery -A app.celery_app.celery_app worker --loglevel=info --pool=solo
```

On Linux production:

```bash
celery -A app.celery_app.celery_app worker --loglevel=info --concurrency=2
```

You should see:

```txt
[tasks]
  . scraper.run_spider
```

---

### 4. Run Scrapy Manually

You can also test spiders manually:

```bash
cd scraper
uv run scrapy crawl gadgetbyte -a category=mobiles -a brand=samsung
```

The Scrapy pipeline will save/update products in PostgreSQL.

---

## Database Model

The main table is `products`.

Important fields:

```txt
id
store
category
brand
model_name
variant
ram
storage
price
price_text
price_type
currency
product_url
source_url
in_stock
scraped_at
created_at
updated_at
```

Unique rule:

```txt
store + product_url must be unique
```

This prevents duplicate rows from the same store and product URL.

---

## Redis Usage

Redis is used in three separate ways:

| Redis DB | Purpose |
|---|---|
| DB 0 | Celery broker |
| DB 1 | Celery result backend |
| DB 2 | Product API cache |

Product cache keys follow this pattern:

```txt
products:*
```

After a successful scraping task, product cache keys are cleared so the API can serve fresh data.

---

## Current Version

```txt
v0.0.1
```

Current release includes:

- FastAPI backend foundation
- Product APIs
- Scrapy pipeline integration
- PostgreSQL product storage
- Celery + Redis queue
- Redis product cache

---

## Roadmap

- Add frontend using Next.js
- Add admin dashboard for triggering scrapers
- Add scrape job history table
- Add product images
- Add price history tracking
- Add price drop alerts
- Add store-wise comparison page
- Add authentication for admin routes
- Add scheduled scraping
- Add Docker setup for full stack
- Deploy backend and worker to production VPS

---

## Planned Frontend

The frontend will be built with Next.js.

Main pages:

```txt
/                   Homepage
/products           Product search and listing
/products/[id]      Product detail page
/admin/scrape       Admin scrape trigger page
```

Frontend will only communicate with FastAPI:

```txt
Next.js Frontend → FastAPI API → Redis/PostgreSQL
```

---

## Brand

**Name:** Kati Ho?  
**Meaning:** “How much is it?” in Nepali  
**Tagline:** Compare. Search. Save.  
**Local tagline:** किन्नु अघि मूल्य तुलना गर्नुहोस्।

---

## Security Notes

- Do not commit `.env`
- Rotate exposed database credentials immediately
- Use admin authentication before exposing scrape trigger endpoints publicly
- Do not allow public users to trigger expensive scraping jobs directly
- Use rate limiting in production

---

## License

This project is currently private/internal. Add a license before public release.

---

## Author

Built by **Milan Prajapati**.
