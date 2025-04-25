# GitHub Template Repository Forking Guide

This step-by-step guide will walk you through the process of forking the AI Defender Leaderboard template repository using only GitHub's web interface. No command line or local development environment is needed!

## What is Forking?

Forking creates your own copy of a repository that you can modify without affecting the original. It's the perfect way to use template repositories like this one.

## Step 1: Access the Template Repository

1. Open your web browser and go to the template repository URL
2. Make sure you're logged into your GitHub account (create one if needed)

## Step 2: Fork the Repository

1. Look for the "Fork" button in the top-right corner of the page
   ![Fork button location](https://docs.github.com/assets/cb-40742/mw-1440/images/help/repository/fork-button.webp)

2. Click the "Fork" button

3. You'll see a "Create a new fork" page with these options:
   - **Owner**: Select your GitHub username
   - **Repository name**: Keep the default or choose a new name
   - **Description**: Optional - you can add your own description
   - **Copy the main branch only**: Keep this checked (default)

4. Click the green "Create fork" button at the bottom

5. Wait a few seconds while GitHub creates your copy of the repository

## Step 3: Verify Your Fork

1. After forking completes, you'll be taken to your new repository
2. The URL will now show your username instead of the original owner
3. You should see all the files from the template repository in your fork

## Step 4: Make Repository Public (If Private)

If your forked repository is private by default:

1. Click on "Settings" in the top navigation bar
2. Scroll down to the "Danger Zone" section
3. Click "Change visibility"
4. Select "Public"
5. Type the confirmation text and click "I understand, change repository visibility"

## Step 5: Enable GitHub Pages (Optional)

If you want to view the README and documentation on a website:

1. Click on "Settings" in the top navigation bar
2. In the left sidebar, click on "Pages"
3. Under "Source", select "Deploy from a branch"
4. Under "Branch", select "main" and "/(root)" folder
5. Click "Save"
6. After a few minutes, your documentation will be available at https://your-username.github.io/repository-name/

## What's Next?

Now that you have your own copy of the leaderboard template:

1. Follow the instructions in the [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) file to deploy the leaderboard API and integrate it with your AI Defender game
2. Make any customizations you want to your forked repository
3. Deploy the API to Vercel as described in the integration guide

## Troubleshooting

If you encounter any issues while forking:

1. **"Fork" button not visible**: Make sure you're logged into GitHub
2. **Error during fork**: Try refreshing the page and attempting again
3. **Repository not showing all files**: Wait a few minutes and refresh the page

## Need More Help?

If you need additional assistance with GitHub:

1. Visit [GitHub Docs](https://docs.github.com/en) for official documentation
2. Use the [GitHub Community Forum](https://github.community/) to ask questions
3. Contact GitHub Support through your account settings
