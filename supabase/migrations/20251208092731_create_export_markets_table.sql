/*
  # Export Markets Table

  ## Overview
  This migration creates a table to manage RF PHARMACEUTICAL's export markets and
  international presence for display on an interactive world map.

  ## New Table

  ### `export_markets`
  - `id` (uuid, primary key) - Unique identifier
  - `country_name` (text) - Full country name
  - `country_code` (text) - ISO 3166-1 alpha-2 country code (e.g., 'US', 'BD')
  - `region` (text) - Geographic region (Asia, Europe, Africa, Americas, Oceania)
  - `description` (text) - Description of market presence
  - `year_established` (integer) - Year market was established
  - `is_active` (boolean) - Active export market
  - `display_order` (integer) - Sort order for display
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on export_markets table
  - Public read access for active markets
  - No public write access (admin-only)

  ## Notes
  - Country codes follow ISO 3166-1 alpha-2 standard for map integration
  - Regions help organize markets by continent
  - Display order allows manual sorting of markets
*/

CREATE TABLE IF NOT EXISTS export_markets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_name text NOT NULL,
  country_code text NOT NULL UNIQUE,
  region text DEFAULT '',
  description text DEFAULT '',
  year_established integer,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE export_markets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active export markets"
  ON export_markets FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE INDEX IF NOT EXISTS idx_export_markets_active ON export_markets(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_export_markets_region ON export_markets(region);

INSERT INTO export_markets (country_name, country_code, region, description, year_established, is_active, display_order) VALUES
('Bangladesh', 'BD', 'Asia', 'Home market with extensive distribution network', 1999, true, 1),
('India', 'IN', 'Asia', 'Major export partner in South Asia', 2005, true, 2),
('Pakistan', 'PK', 'Asia', 'Strategic market in South Asian region', 2007, true, 3),
('Nepal', 'NP', 'Asia', 'Growing pharmaceutical market', 2008, true, 4),
('Sri Lanka', 'LK', 'Asia', 'Island nation with strong healthcare focus', 2009, true, 5),
('United Arab Emirates', 'AE', 'Asia', 'Gateway to Middle Eastern markets', 2010, true, 6),
('Saudi Arabia', 'SA', 'Asia', 'Major Middle Eastern pharmaceutical hub', 2011, true, 7),
('Kenya', 'KE', 'Africa', 'East African regional hub', 2012, true, 8),
('Nigeria', 'NG', 'Africa', 'West African market leader', 2013, true, 9),
('South Africa', 'ZA', 'Africa', 'Southern African distribution center', 2014, true, 10),
('United Kingdom', 'GB', 'Europe', 'European market presence', 2015, true, 11),
('Germany', 'DE', 'Europe', 'Central European operations', 2016, true, 12),
('United States', 'US', 'Americas', 'North American market entry', 2017, true, 13),
('Canada', 'CA', 'Americas', 'North American expansion', 2018, true, 14),
('Australia', 'AU', 'Oceania', 'Oceania regional headquarters', 2019, true, 15)
ON CONFLICT (country_code) DO NOTHING;
