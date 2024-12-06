import { test, expect, Page } from "@playwright/test";

const checkDisabled = async (page: Page, state: string) => {
  const selectingPlayerState = await page.getByTestId(state);
  await expect(selectingPlayerState).toBeDisabled();
};

const click = async (page: Page, buttonText: string) => {
  await page.getByRole("button", { name: buttonText }).click();
};

test.describe("Boss Pirate Games", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
    await expect(page).toHaveTitle(/BOSS WinterGames/);

    await expect(
      page.getByRole("link", { name: "Pirate games" })
    ).not.toBeVisible();
    await page.getByPlaceholder("You didn't say the magic word!").fill("argh");
    const pirateGamesLink = page.getByRole("link", { name: "Pirate games" });
    await expect(pirateGamesLink).toBeVisible();
    await pirateGamesLink.click();

    await expect(page).toHaveTitle("BOSS PirateGames");
  });

  test("should verify players in each team", async ({ page }) => {
    // Blue
    const blueTeam = page.getByTestId("Blue");
    await expect(blueTeam).toBeVisible();
    const bluePlayers = await blueTeam.locator("[data-testid]").all();
    const bluePlayerNames = await Promise.all(
      bluePlayers.map(
        async (player) => await player.getAttribute("data-testid")
      )
    );
    expect(bluePlayerNames).toEqual([
      "Ante",
      "Dennan",
      "Ivar",
      "Joel",
      "Kling",
    ]);

    // Red
    const redTeam = page.getByTestId("Red");
    await expect(redTeam).toBeVisible();
    const redPlayers = await redTeam.locator("[data-testid]").all();
    const redPlayerNames = await Promise.all(
      redPlayers.map(async (player) => await player.getAttribute("data-testid"))
    );
    expect(redPlayerNames).toEqual([
      "Mattis",
      "Palmen",
      "Robban",
      "Schäran",
      "Sebbe",
      "Virre",
    ]);
  });

  test("should verify all player scores are 0", async ({ page }) => {
    // Verify Blue Team Scores
    const blueTeam = page.getByTestId("Blue");
    const bluePlayers = await blueTeam.locator("[data-testid]").all();
    for (const player of bluePlayers) {
      const score = await player.locator("p").last().textContent();
      expect(score?.trim()).toBe("0 / 0");
    }

    // Verify Red Team Scores
    const redTeam = page.getByTestId("Red");
    const redPlayers = await redTeam.locator("[data-testid]").all();
    for (const player of redPlayers) {
      const score = await player.locator("p").last().textContent();
      expect(score?.trim()).toBe("0 / 0");
    }
  });

  test("should walk through all states", async ({ page }) => {
    await checkDisabled(page, "ready-state");
    await click(page, "Hoist the sails, adventure calls!");
    await checkDisabled(page, "waiting-for-spin-state");
    await click(page, "Dare ye spin for a game?");
    await checkDisabled(page, "spinning-wheel-state");
    await page.waitForTimeout(6300);
    await checkDisabled(page, "explaining-game-state");
    await click(page, "Find the brave souls!");
    await checkDisabled(page, "selecting-players-state");
    await page.waitForTimeout(6300);
    await checkDisabled(page, "playing-game");
  });
});
