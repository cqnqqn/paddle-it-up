# San Marcos Pickleball Website

A modern, mobile-responsive one-page website for San Marcos Pickleball gym.

## Project Structure

```
pickleball-gym/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # JavaScript interactions
├── images/             # Image assets (add your images here)
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Setup Instructions

### 1. Replace Placeholder Images

Add your images to the `images/` folder and update the references:

#### Logo
In `index.html`, find the logo section in the header and replace:
```html
<!-- Replace with: <img src="images/logo.png" alt="San Marcos Pickleball Logo"> -->
LOGO
```
With your actual logo image.

#### Hero Background
In `css/styles.css`, find the `.hero` section and update the background:
```css
/* Replace this: */
background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-light) 100%);

/* With this: */
background: linear-gradient(rgba(26, 35, 50, 0.7), rgba(26, 35, 50, 0.7)),
            url('../images/hero-bg.jpg') center/cover no-repeat;
```

#### Product Images
In `index.html`, find each product card and replace the placeholder:
```html
<!-- Replace with: <img src="images/product-classic-tee.jpg" alt="Classic Logo Tee"> -->
<span>Product Image</span>
```
With your actual product images. Recommended size: 800x800px (will display at various sizes).

### 2. Adding Shopify Buy Buttons

For each product, you'll need to add a Shopify Buy Button:

1. Log in to your **Shopify Admin** dashboard
2. Go to **Sales channels** → **Buy Button**
3. Click **Create a Buy Button**
4. Select the product you want to add
5. Customize the button appearance:
   - **Button color**: `#7FBA00` (to match site theme)
   - **Button text**: "Add to Cart" or "Buy Now"
   - **Font**: Montserrat (if available)
6. Click **Generate code**
7. Copy the generated embed code

In `index.html`, find the corresponding product section:
```html
<!-- Shopify Buy Button for Classic Logo Tee goes here -->
<div id="shopify-product-1" class="shopify-buy-button">
    <!--
        SHOPIFY BUY BUTTON INSTRUCTIONS:
        ...
    -->
</div>
```

Replace the entire `<div id="shopify-product-X">` block with your Shopify embed code.

**Repeat for each product:**
- Product 1: `shopify-product-1` → Classic Logo Tee
- Product 2: `shopify-product-2` → Performance Tee
- Product 3: `shopify-product-3` → Vintage Tee

### 3. Update Content

Update the following placeholder content in `index.html`:

- **Business Name**: Search for "San Marcos Pickleball" and replace as needed
- **Address**: `123 Placeholder St, San Marcos, CA 92078`
- **Phone**: `(760) 555-0123`
- **Email**: `info@placeholder.com`
- **Hours**: Update operating hours as needed
- **Social Media Links**: Update `href="#"` with actual Instagram/Facebook URLs

### 4. Update Structured Data

In `index.html`, find the JSON-LD structured data in the `<head>` section and update:
- `url`: Your actual website URL
- `telephone`: Your phone number
- `email`: Your email address
- `address`: Your actual address
- `geo`: Update latitude/longitude for your location
- `sameAs`: Your social media profile URLs

---

## GitHub Pages Deployment

### Initial Setup

1. **Create a GitHub account** (if you don't have one) at [github.com](https://github.com)

2. **Create a new repository**
   - Click the **+** icon in the top right → **New repository**
   - Repository name: `pickleball-gym`
   - Set to **Public** (required for free GitHub Pages)
   - Do NOT initialize with README (we already have one)
   - Click **Create repository**

3. **Upload project files**

   **Option A: Using GitHub web interface**
   - On your new repo page, click **uploading an existing file**
   - Drag and drop all project files and folders
   - Click **Commit changes**

   **Option B: Using Git command line**
   ```bash
   # Navigate to your project folder
   cd /path/to/paddleitup

   # Initialize git repository
   git init

   # Add all files
   git add .

   # Commit files
   git commit -m "Initial commit: San Marcos Pickleball website"

   # Add remote repository (replace YOUR-USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR-USERNAME/pickleball-gym.git

   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** (tab at the top)
   - Scroll down to **Pages** in the left sidebar
   - Under **Source**, select **Deploy from a branch**
   - Select **main** branch and **/ (root)** folder
   - Click **Save**

5. **Access your live site**
   - Your site will be live at: `https://YOUR-USERNAME.github.io/pickleball-gym`
   - First deployment may take 1-2 minutes

### Custom Domain Configuration

To use a custom domain (e.g., `www.yourdomain.com`) with GitHub Pages:

#### Step 1: Configure GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain: `www.yourdomain.com`
3. Click **Save**
4. Check **Enforce HTTPS** (after DNS propagates)

This will automatically create a `CNAME` file in your repository.

#### Step 2: Configure GoDaddy DNS

1. Log in to your **GoDaddy** account
2. Go to **My Products** → **Domains** → Select your domain → **DNS**
3. Add/edit the following DNS records:

   **For www subdomain (recommended):**
   | Type  | Name | Value                        | TTL    |
   |-------|------|------------------------------|--------|
   | CNAME | www  | YOUR-USERNAME.github.io     | 1 Hour |

   **For apex domain (yourdomain.com without www):**
   | Type | Name | Value           | TTL    |
   |------|------|-----------------|--------|
   | A    | @    | 185.199.108.153 | 1 Hour |
   | A    | @    | 185.199.109.153 | 1 Hour |
   | A    | @    | 185.199.110.153 | 1 Hour |
   | A    | @    | 185.199.111.153 | 1 Hour |

4. **Save** your DNS changes
5. Wait for DNS propagation (can take up to 48 hours, usually faster)

#### Step 3: Verify and Enable HTTPS

1. Once DNS propagates, go back to **Settings** → **Pages**
2. Check **Enforce HTTPS**
3. GitHub provides free SSL certificates automatically

### Deployment Workflow

Once set up, deploying updates is simple. **Changes pushed to GitHub auto-deploy** to your live site.

```bash
# Make your changes to files locally

# Check what files changed
git status

# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Update product prices"

# Push to GitHub (triggers auto-deploy)
git push

# Your changes will be live in 1-2 minutes!
```

**Typical deployment time:** Changes appear on your live site within **1-2 minutes** after pushing.

### Deployment Notes

- **Auto-deploy**: Every push to the `main` branch automatically triggers a new deployment
- **Build status**: Check deployment status in the **Actions** tab of your repository
- **Rollback**: If needed, you can revert to a previous commit and push to rollback changes
- **No build step**: Since this is a static HTML site, GitHub Pages serves files directly with no build process

---

## Post-Deployment Checklist

- [ ] Verify site loads at GitHub Pages URL
- [ ] Test on mobile devices
- [ ] Check all navigation links work
- [ ] Verify smooth scrolling
- [ ] Test mobile menu functionality
- [ ] Confirm Shopify Buy Buttons load and function
- [ ] Test click-to-call and mailto links
- [ ] Check images load properly
- [ ] Verify social media links work
- [ ] (If using custom domain) Verify HTTPS works

---

## Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --color-primary: #7FBA00;      /* Bright green */
    --color-secondary: #1a2332;    /* Navy */
    /* ... */
}
```

### Fonts
Fonts are loaded from Google Fonts. To change, update the link in `index.html` and the CSS variables.

### Adding More Products
Copy an existing product card in the Shop section and:
1. Update the product image
2. Update the product name and price
3. Add a new Shopify Buy Button

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari
- Android Chrome

---

## Technical Notes

- **No frameworks required** - Pure HTML, CSS, and JavaScript
- **Mobile-first responsive design** with breakpoints at 320px, 768px, and 1024px
- **Accessible** - Includes ARIA labels and keyboard navigation
- **Performance optimized** - Throttled scroll events, efficient animations
- **GitHub Pages optimized** - All paths are relative, no server-side processing required

---

## Support

For issues with:
- **Shopify Buy Buttons**: Contact [Shopify Support](https://help.shopify.com)
- **GitHub Pages**: See [GitHub Pages Documentation](https://docs.github.com/en/pages)
- **Custom Domain DNS**: Contact [GoDaddy Support](https://www.godaddy.com/help)
- **Website code**: Review this documentation or contact your developer
