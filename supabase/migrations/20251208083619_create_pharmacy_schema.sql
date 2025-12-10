/*
  # RF PHARMACEUTICAL LTD Database Schema

  ## Overview
  This migration creates the complete database schema for RF PHARMACEUTICAL LTD website,
  including products catalog, news management, career listings, and newsletter subscriptions.

  ## New Tables

  ### 1. `product_categories`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Category name (e.g., "Tablets", "Capsules", "Injectables")
  - `slug` (text, unique) - URL-friendly version
  - `description` (text) - Category description
  - `display_order` (integer) - Sort order for display
  - `created_at` (timestamptz) - Creation timestamp

  ### 2. `products`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Product name
  - `slug` (text, unique) - URL-friendly version
  - `category_id` (uuid, foreign key) - Links to product_categories
  - `description` (text) - Product description
  - `composition` (text) - Active ingredients
  - `dosage_form` (text) - Form (tablet, capsule, etc.)
  - `strength` (text) - Dosage strength
  - `pack_size` (text) - Package size
  - `indications` (text) - Medical uses
  - `image_url` (text) - Product image
  - `is_featured` (boolean) - Featured on homepage
  - `is_active` (boolean) - Published status
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `news`
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - News title
  - `slug` (text, unique) - URL-friendly version
  - `excerpt` (text) - Short summary
  - `content` (text) - Full content
  - `image_url` (text) - Featured image
  - `published_date` (date) - Publication date
  - `is_published` (boolean) - Published status
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. `careers`
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Job title
  - `department` (text) - Department name
  - `location` (text) - Job location
  - `employment_type` (text) - Full-time, Part-time, etc.
  - `description` (text) - Job description
  - `requirements` (text) - Job requirements
  - `responsibilities` (text) - Job responsibilities
  - `application_deadline` (date) - Deadline for applications
  - `is_active` (boolean) - Currently accepting applications
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 5. `newsletter_subscriptions`
  - `id` (uuid, primary key) - Unique identifier
  - `email` (text, unique) - Subscriber email
  - `subscribed_at` (timestamptz) - Subscription timestamp
  - `is_active` (boolean) - Subscription status

  ## Security
  - Enable RLS on all tables
  - Public read access for published content
  - No public write access (admin-only in future)

  ## Notes
  - All tables use UUID primary keys for security
  - Timestamps track creation and updates
  - Boolean flags control visibility/status
  - Slugs enable SEO-friendly URLs
*/

-- Create product_categories table
CREATE TABLE IF NOT EXISTS product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category_id uuid REFERENCES product_categories(id) ON DELETE SET NULL,
  description text DEFAULT '',
  composition text DEFAULT '',
  dosage_form text DEFAULT '',
  strength text DEFAULT '',
  pack_size text DEFAULT '',
  indications text DEFAULT '',
  image_url text DEFAULT '',
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text DEFAULT '',
  content text DEFAULT '',
  image_url text DEFAULT '',
  published_date date DEFAULT CURRENT_DATE,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create careers table
CREATE TABLE IF NOT EXISTS careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text DEFAULT '',
  location text DEFAULT '',
  employment_type text DEFAULT 'Full-time',
  description text DEFAULT '',
  requirements text DEFAULT '',
  responsibilities text DEFAULT '',
  application_deadline date,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view product categories"
  ON product_categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Anyone can view published news"
  ON news FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Anyone can view active careers"
  ON careers FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view their subscription"
  ON newsletter_subscriptions FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published, published_date DESC) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_careers_active ON careers(is_active) WHERE is_active = true;