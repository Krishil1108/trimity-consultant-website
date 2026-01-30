# Deploying Trimity Consultants to Vercel

## Prerequisites
- ✅ Vercel account (logged in)
- ✅ GitHub account
- ✅ Git installed on your computer

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI** (if not already installed)
   ```powershell
   npm install -g vercel
   ```

2. **Navigate to your project**
   ```powershell
   cd "C:\Users\krishils\Desktop\web"
   ```

3. **Deploy to Vercel**
   ```powershell
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **trimity-consultants** (or your preferred name)
   - In which directory is your code? **.**
   - Want to override settings? **N**

5. **Deploy to production**
   ```powershell
   vercel --prod
   ```

Your site will be live at: `https://trimity-consultants.vercel.app`

---

### Option 2: Deploy via GitHub + Vercel (Recommended for Auto-Deploy)

#### Step 1: Push to GitHub

1. **Initialize Git** (if not already done)
   ```powershell
   cd "C:\Users\krishils\Desktop\web"
   git init
   ```

2. **Create `.gitignore` file** (already exists, verify it contains):
   ```
   node_modules
   .next
   .env*.local
   ```

3. **Commit your code**
   ```powershell
   git add .
   git commit -m "Initial commit - Trimity Consultants website"
   ```

4. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name: `trimity-consultants`
   - Keep it **Public** or **Private**
   - Don't initialize with README
   - Click **Create repository**

5. **Push to GitHub**
   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/trimity-consultants.git
   git branch -M main
   git push -u origin main
   ```

#### Step 2: Deploy on Vercel

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Click **"Add New..."** → **"Project"**

2. **Import your GitHub repository:**
   - Click **"Import"** next to your `trimity-consultants` repo
   - If you don't see it, click **"Adjust GitHub App Permissions"**

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)
   - **Install Command:** `npm install --legacy-peer-deps` (⚠️ IMPORTANT: Change this!)

4. **Environment Variables** (if needed):
   - Click **"Add Environment Variable"**
   - Add any `.env` variables (none required for this project)

5. **Click "Deploy"**
   - Vercel will build and deploy your site
   - First deployment takes 2-3 minutes

6. **Your site is live!**
   - You'll get a URL like: `https://trimity-consultants.vercel.app`
   - Every push to `main` branch will auto-deploy

---

## Custom Domain Setup (Optional)

### Add Your Domain

1. **In Vercel Dashboard:**
   - Go to your project → **Settings** → **Domains**
   - Click **"Add"**
   - Enter your domain: `www.trimityconsultants.com`

2. **Update DNS Records:**
   - **For root domain** (`trimityconsultants.com`):
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     ```
   
   - **For www subdomain** (`www.trimityconsultants.com`):
     ```
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

3. **Wait for DNS propagation** (5 minutes - 48 hours)

---

## Troubleshooting

### Build Errors

If deployment fails, check:

1. **Framer Motion Type Errors:**
   - These are warnings, not errors
   - Build should still succeed

2. **Clear cache and rebuild:**
   ```powershell
   Remove-Item -Recurse -Force .next
   npm run build
   ```

3. **Check Vercel logs:**
   - Go to Vercel Dashboard → Your Project → **Deployments**
   - Click on failed deployment → **View Build Logs**

### Environment Variables

If you need to add environment variables later:
1. Vercel Dashboard → Project → **Settings** → **Environment Variables**
2. Add variables for Production, Preview, and Development
3. Redeploy the project

---

## Useful Commands

```powershell
# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Open project in browser
vercel open

# Deploy to production
vercel --prod

# Remove deployment
vercel rm trimity-consultants
```

---

## Auto-Deploy Setup

Once connected to GitHub:
- ✅ Push to `main` → Auto-deploys to **Production**
- ✅ Push to other branches → Auto-deploys to **Preview**
- ✅ Pull requests → Get unique preview URLs

---

## Performance Optimizations

Your site automatically gets:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Automatic code splitting
- ✅ Edge network caching

---

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Vercel Status: https://vercel-status.com

---

## Project URLs (After Deployment)

- **Production:** `https://trimity-consultants.vercel.app`
- **Dashboard:** `https://vercel.com/dashboard`
- **Analytics:** Enable in Vercel Dashboard → Your Project → Analytics

---

**Note:** The first deployment might take 2-3 minutes. Subsequent deployments are faster (30-60 seconds).
