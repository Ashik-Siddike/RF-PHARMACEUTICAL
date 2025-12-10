# RF PHARMACEUTICAL - Admin System Guide

## Overview

The RF PHARMACEUTICAL website includes a complete Product Management System (CMS) for administrators to manage the product catalog displayed on the public website. This is a content management system only - no e-commerce functionality is included.

## Features

### Full CRUD Operations
- **Create**: Add new pharmaceutical products to the catalog
- **Read**: View all products in a searchable, sortable table
- **Update**: Edit existing product information
- **Delete**: Remove products from the database

### Product Data Fields
Each product entry includes:
- Product Name (required)
- URL Slug (required, auto-generated)
- Generic Name / Composition
- Product Category (Tablets, Capsules, Injectables, etc.)
- Dosage Form
- Strength / Dosage
- Pack Size
- Product Description
- Indications / Therapeutic Class
- Product Image URL
- Featured Product (checkbox)
- Active / Published Status (checkbox)

## Accessing the Admin Portal

### Method 1: Footer Link
Click the "Admin" link in the website footer (next to the copyright notice)

### Method 2: Direct URL
Navigate directly to the admin dashboard by changing the page state to admin

## Admin Portal Structure

### 1. Login Page
- Secure authentication using Supabase Auth
- Email and password required
- Only authenticated users can access admin pages

### 2. Dashboard
- Overview statistics:
  - Total products
  - Active products
  - Inactive products
  - Number of categories
- Quick access buttons:
  - Manage Products
  - Add New Product

### 3. Manage Products
- Full product listing in a table format
- Search functionality (by name, composition, or form)
- Product count display
- Actions for each product:
  - Edit button (blue pencil icon)
  - Delete button (red trash icon)
- Delete confirmation modal for safety

### 4. Add/Edit Product Form
- Comprehensive form with all product fields
- Auto-slug generation from product name
- Category dropdown selection
- Featured and Active status toggles
- Image URL upload (placeholder for future file upload)
- Cancel and Save buttons
- Success/Error message display

## Creating Your First Admin Account

Since the admin system uses Supabase Auth, you need to create an admin user account:

### Option 1: Using Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Click "Add User"
4. Enter email and password
5. Click "Create User"

### Option 2: Using Sign Up Function (if enabled)
If you enable the sign-up functionality in Supabase, users can register themselves.

## Security Features

- **Authentication Required**: All admin pages require login
- **Route Protection**: Unauthenticated users are redirected to login
- **Session Management**: Automatic session handling with Supabase
- **Row Level Security**: Database policies protect data access

## Product Management Workflow

### Adding a New Product
1. Click "Add New Product" from dashboard or product list
2. Fill in product information:
   - Enter product name (slug auto-generates)
   - Select category
   - Add composition and dosage details
   - Write product description
   - Add indications
   - Optionally add image URL
   - Check "Featured" if it should appear on homepage
   - Check "Active" to publish immediately
3. Click "Create Product"
4. Product appears in catalog and on public website (if active)

### Editing a Product
1. Navigate to "Manage Products"
2. Click the edit icon (pencil) next to the product
3. Modify any fields as needed
4. Click "Update Product"
5. Changes reflect immediately on public website

### Deleting a Product
1. Navigate to "Manage Products"
2. Click the delete icon (trash) next to the product
3. Confirm deletion in the modal
4. Product is permanently removed from database

### Searching Products
1. Use the search bar in "Manage Products"
2. Search by:
   - Product name
   - Composition
   - Dosage form
3. Results update in real-time

## Status Management

### Featured Products
- Products marked as "Featured" appear on the homepage
- Shows in the "Featured Products" section
- Limit to 3-5 featured products for best display

### Active/Inactive Status
- **Active**: Product is visible on public website
- **Inactive**: Product is hidden from public but remains in database
- Use inactive status for:
  - Products under development
  - Temporarily unavailable items
  - Seasonal products

## Database Structure

The admin system manages the following database tables:
- `products`: All product information
- `product_categories`: Product categories and classification
- `newsletter_subscriptions`: Email subscriptions from footer

## Best Practices

1. **Product Names**: Use clear, consistent naming (e.g., "RF-ProductName")
2. **Slugs**: Keep slugs lowercase with hyphens, no spaces
3. **Descriptions**: Write clear, patient-friendly descriptions
4. **Categories**: Assign appropriate categories for filtering
5. **Images**: Use consistent image dimensions for best display
6. **Featured Products**: Limit to your best/most important products
7. **Status**: Use inactive status instead of deleting when unsure

## Troubleshooting

### Can't Log In
- Verify email and password are correct
- Check that user exists in Supabase Auth
- Ensure Supabase environment variables are set

### Products Not Appearing
- Verify product status is "Active"
- Check that product has required fields (name, slug)
- Refresh the page

### Delete Not Working
- Ensure you have proper database permissions
- Check for database connection errors
- Verify Row Level Security policies

## Future Enhancements

Potential features for future development:
- Image file upload (currently URL-based)
- Bulk product import/export
- Product inventory tracking
- Sales analytics
- Multi-language support
- Product version history

## Support

For technical support or questions:
- Email: admin@rfpharma.com
- Documentation: See project README.md
- Database: Check Supabase dashboard for data issues
