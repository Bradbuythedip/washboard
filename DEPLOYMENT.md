# Deployment Guide for PumpFun Washboard

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Website (Recommended)

1. **Visit Vercel**: Go to [vercel.com](https://vercel.com)

2. **Sign In**: Sign in with your GitHub account

3. **Import Project**: 
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `Bradbuythedip/washboard`
   - Click "Import"

4. **Configure Project**:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Deploy**: Click "Deploy" and wait for the build to complete

6. **Your App is Live**: Vercel will provide you with a URL like `https://washboard.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

Follow the prompts:
- Set up and deploy? Y
- Which scope? (Select your account)
- Link to existing project? N
- What's your project's name? washboard
- In which directory is your code located? ./
- Want to override settings? N

## Environment Variables (Optional)

If you want to add environment variables:

1. In Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables like:
   - `REACT_APP_SOLANA_RPC_URL`
   - `REACT_APP_API_ENDPOINT`

## Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Automatic Deployments

Once connected to GitHub, Vercel will:
- ✅ Auto-deploy on every push to `main` branch
- ✅ Create preview deployments for pull requests
- ✅ Run build checks

## Build Configuration

The project is already configured with `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm start",
  "installCommand": "npm install"
}
```

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Ensure all dependencies are in package.json
- Review build logs in Vercel dashboard

### Large Bundle Size
- Consider code splitting
- Lazy load components
- Optimize images

### Environment Issues
- Ensure environment variables are prefixed with `REACT_APP_`
- Add them in Vercel dashboard, not in code

## Post-Deployment

1. **Test Your App**: Visit your Vercel URL
2. **Update README**: Add your live URL to README.md
3. **Share**: Share your DApp with the community!

## Monitoring

- View analytics in Vercel Dashboard
- Monitor performance metrics
- Check error logs

## Updating the App

```bash
# Make changes locally
git add .
git commit -m "Your update message"
git push origin main

# Vercel will automatically redeploy!
```

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- GitHub Issues: https://github.com/Bradbuythedip/washboard/issues

---

**Your PumpFun Washboard is ready to deploy! 🚀**
