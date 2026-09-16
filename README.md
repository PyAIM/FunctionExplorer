# Function Explorer

A gamified precalculus functions learning environment. The app is configured for GitHub Pages at **https://pyaim.github.io/FunctionExplorer/**.

## Local development

```bash
pnpm install
pnpm dev
```

## Verify and build

```bash
pnpm check
pnpm build
```

The static GitHub Pages site is produced in `docs/`.

## Publish to GitHub Pages

1. Create an empty GitHub repository named `FunctionExplorer` under the `pyaim` account.
2. Push this project to its `main` branch.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/docs` folder, then click **Save**.
6. After GitHub Pages finishes deploying, visit `https://pyaim.github.io/FunctionExplorer/`.

No server, secrets, analytics scripts, tracking scripts, or platform-specific runtime are required.

## Audio

The supplied soundtrack MP3s are included under `client/public/assets/`. Music starts only after a visitor explicitly selects **Start music** in the soundtrack control.

## Assessment and scorecard enhancements

- Each regular activity now draws **8 or 9 questions at random from a topic bank of 20**.
- The final checkpoint draws **20 questions at random from a cumulative bank of 48**.
- The mission scorecard records attempts, best result, most recent result, completion status, badges, and XP in the learner's browser.
- Learners can export the scorecard as a **CSV** or **text** file, or use **Print / save PDF**. They can then submit that file to an instructor.

## Cipher Vault: inverse-function investigation

After clearing **Inverse Portal**, learners unlock Cipher Vault, a narrative side investigation that turns inverse functions into a cipher-breaking tool. The intercepted message is encrypted by `E(x) = 2x + 9`. Learners must derive `E⁻¹(x) = (x − 9) / 2`, apply the inverse to each intercepted number, use the built-in uppercase ASCII lookup table, and enter the recovered plaintext. The activity includes an introductory ASCII briefing for students who have not previously encountered character codes, packet-by-packet feedback, a case-progress rail, optional sound effects, and a persistent 60-XP Cipher Specialist reward. It is deliberately a mastery activity rather than a graded mission, so it reinforces inverse reasoning without affecting the final checkpoint prerequisites.

## Updating an existing GitHub repository from PowerShell

After replacing the repository files with a newer download, run the following from the repository folder:

```powershell
git add .
git commit -m "Enhance randomized practice and student scorecards"
git push origin main
```

GitHub Pages will redeploy the committed `docs/` folder automatically. No GitHub Pages settings need to change.
