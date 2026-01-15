# My Portfolio Site

A clean, responsive, and barebone static portfolio site ready for GitHub Pages.

## Structure

- \`index.html\`: The main structure of the website using semantic HTML5.
- \`styles.css\`: Modern vanilla CSS styles including variables and responsive grid layout.

## How to Customize

1.  **Edit Content**: Open \`index.html\` and replace the placeholder text (like "[Your Name]", project descriptions) with your own info.
2.  **Add Projects**: Copy and paste the \`project-card\` div in the Projects section to add more work.
3.  **Themes**: Change the colors in \`:root\` at the top of \`styles.css\` to match your personal brand.

## How to Deploy to GitHub Pages

1.  Push this repository to GitHub.
2.  Go to the repository **Settings**.
3.  Navigate to **Pages** (in the sidebar).
4.  Under **Source**, select **Deploy from a branch**.
5.  Select your main branch (e.g., \`main\` or \`master\`) and the \`/ (root)\` folder.
6.  Click **Save**.

Your site will be live at `https://<your-username>.github.io/<repo-name>/` in a few minutes!

## Local Development

To run the site locally:

1.  Ensure you have Node.js and **pnpm** installed.
2.  Run `pnpm install` to install dependencies.
3.  Run `pnpm start`.
    -   This command will start a local server with **hot reload** enabled. It will automatically open in your browser and refresh whenever you save a file.
