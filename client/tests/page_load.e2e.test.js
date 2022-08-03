import puppeteer from 'puppeteer'

const PAGE_URL = 'http://localhost:3002/'
const FAVORITES_URL = PAGE_URL + 'profile/user_favorites'
const TEST_RECIPE_ID = '62e33229fb7d41f7ccbd226b'
const TEST_RECIPE_URL = PAGE_URL + 'recipes/' + TEST_RECIPE_ID
const TEST_RECIPE_TITLE = 'Giant Jerusalem Artichoke Latkes'
const TEST_USERNAME = 'hello@hello.com'
const TEST_PASSWORD = 'helloworld'

let browser
let page

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true, timeout: 30000 })
  page = await browser.newPage()
})

afterEach(async () => {
  await page.evaluate(() => {
    // Log out after each test
    localStorage.clear()
  })
}
)

jest.setTimeout(30000)

const doesTestRecipeExist = () => page.$x(`//text()[.='${TEST_RECIPE_TITLE}']`)

const loginUser = async (page) => {
  await page.goto(PAGE_URL)
  const loginButton = await page.$('[data-testId="LoginButton"]')
  expect(loginButton).not.toBeNull()
  await loginButton.click()

  const usernameInput = await page.$('[data-testId="LoginUsernameInput"]')
  const passwordInput = await page.$('[data-testId="LoginPasswordInput"]')
  const loginSubmitButton = await page.$('[data-testId="LoginModalSubmit"]')
  expect(usernameInput).not.toBeNull()
  expect(passwordInput).not.toBeNull()
  expect(loginSubmitButton).not.toBeNull()

  await usernameInput.click()
  await usernameInput.type(TEST_USERNAME)
  await passwordInput.click()
  await passwordInput.type(TEST_PASSWORD)

  await loginSubmitButton.click()
  await page.waitForTimeout(100)
  const avatar = await page.$('[data-testId="UserAvatar"]')
  expect(avatar).not.toBeNull()
}

describe('Main App Grid', () => {
  it('Loads recipe grid', async () => {
    await page.goto(PAGE_URL)
    expect(await page.$$('[data-testId=RecipeGridNavBar')).toBeDefined()
    expect(await page.$$('[data-testId=RecipeGrid')).toBeDefined()
    const recipeCardCount = (await page.$$('[data-testId="RecipeCard"]')).length
    expect(recipeCardCount).toBeGreaterThan(0)
  })

  it('Shows recipe view on click', async () => {
    await page.goto(PAGE_URL)
    await page.waitForNetworkIdle()
    await Promise.all([page.click('[data-testId="RecipeCard"]'), page.waitForNetworkIdle()])
    expect(page.url()).not.toEqual(PAGE_URL)
  })
})

describe('Recipe view', () => {
  it('Loads test recipe', async () => {
    await page.goto(TEST_RECIPE_URL)
    /**
     * Check that all cards are loaded
     */
    expect((await page.$$('[data-testId="IngredientsCard"]')).length).toBe(1)
    expect((await page.$$('[data-testId="InstructionCard"]')).length).toBe(1)
    expect((await page.$$('[data-testId="RecommendedCard"]')).length).toBe(1)
    expect(await doesTestRecipeExist()).toHaveLength(1)
  })

  it('Test recommendations card', async () => {
    await page.goto(TEST_RECIPE_URL)
    expect(await doesTestRecipeExist()).toHaveLength(1)

    // Recommendations card should be loaded
    const recommendedCard = await page.$('[data-testId="RecommendedCard"]')
    expect(recommendedCard).not.toBeNull()
    const recommendation = await recommendedCard.$('[data-testId="RecipeCard"]')
    await Promise.all([recommendation.click(), page.waitForNetworkIdle()])

    // Recommendation should not show previous recipe
    expect(page.url()).not.toEqual(TEST_RECIPE_URL)
    expect(await doesTestRecipeExist()).toHaveLength(0)
  })
})

describe('Search bar', () => {
  it('Test text search', async () => {
    await page.goto(PAGE_URL)
    const searchBar = (await page.$('[data-testId="SearchBarTextField"]'))
    await searchBar.click()
    await searchBar.type('Chicken')
    await page.keyboard.press('Enter')
    expect(page.url()).not.toEqual(PAGE_URL)
    await page.waitForNetworkIdle()
    const recipeCardCount = (await page.$$('[data-testId="RecipeCard"]')).length
    expect(recipeCardCount).toBeGreaterThan(0)
  })
})

describe('User login', () => {
  it('Login modal pop up', async () => {
    await page.goto(PAGE_URL)

    // Check that login modal is not visible at first view
    let loginModal = await page.$('[data-testId="LoginModal"]')
    const loginButton = await page.$('[data-testId="LoginButton"]')
    const signupButton = await page.$('[data-testId="SignupButton"]')

    expect(loginModal).toBeNull()
    expect(loginButton).not.toBeNull()
    expect(signupButton).not.toBeNull()

    await loginButton.click()

    // Check for login modal and username input
    loginModal = await page.$('[data-testId="LoginModal"]')
    const usernameInput = await page.$('[data-testId="LoginUsernameInput"]')
    const passwordInput = await page.$('[data-testId="LoginPasswordInput"]')
    const loginSubmitButton = await page.$('[data-testId="LoginModalSubmit"]')
    expect(loginModal).not.toBeNull()
    expect(usernameInput).not.toBeNull()
    expect(passwordInput).not.toBeNull()
    expect(loginSubmitButton).not.toBeNull()

    await usernameInput.click()
    await usernameInput.type('hello@hello.com')
    await passwordInput.click()
    await passwordInput.type('helloworld')
    await loginSubmitButton.click()

    await page.waitForTimeout(100)

    // After login, modal should be hidden
    loginModal = await page.$('[data-testId="LoginModal"]')
    expect(loginModal).toBeNull()

    // User avatar should be present in page
    const userAvatar = await page.$('[data-testId="UserAvatar"]')
    expect(userAvatar).not.toBeNull()
  })
})

describe('Favorite Button', () => {
  it('Favorite button functionality', async () => {
    await page.goto(PAGE_URL)
    let favoriteButtons = await page.$$('[data-testId="FavoriteButton"]')
    expect(favoriteButtons).toHaveLength(0)

    await loginUser(page)

    // Check if buttons show up after login
    favoriteButtons = await page.$$('[data-testId="FavoriteButton"]')
    expect(favoriteButtons.length).toBeGreaterThan(0)

    // Navigate to recipe url and check if favorite button is there
    await page.goto(TEST_RECIPE_URL)
    const favoriteButton = await page.$('[data-testId="FavoriteButton"]')
    expect(favoriteButton).not.toBeNull()

    // Check current favorite status, if isFavorite click button an extra time to unset
    const isFavorite = () => page.$('[data-testId="isFavorite"]')
    if ((await isFavorite() != null)) {
      await favoriteButton.click()
      await page.waitForFunction(
        () => document.querySelectorAll('[data-testId="isFavorite"]').length === 0)
      expect(await isFavorite()).toBeNull()
    }

    // Verify that icon changes once favorited
    await favoriteButton.click()
    await page.waitForSelector('[data-testId="isFavorite"]')
    expect(await isFavorite()).not.toBeNull()

    // Icon should stay favorited even after a page refresh
    await page.goto(PAGE_URL)
    await page.goto(TEST_RECIPE_URL)
    await page.waitForSelector('[data-testId="isFavorite"]')
    expect(await isFavorite()).not.toBeNull()

    // Recipe should be in favorites page
    await page.goto(FAVORITES_URL)
    await page.waitForSelector('[data-testId="RecipeGrid"]')
    expect(await doesTestRecipeExist()).not.toBeNull()
  })
})

describe('Comments System', () => {
  it('Posting comments', async () => {
    await loginUser(page)
    await page.goto(TEST_RECIPE_URL)

    // Click new comment button and wait for editor
    const commentButton = await page.$('[data-testId="NewCommentButton"]')
    expect(commentButton).not.toBeNull()
    await Promise.all([commentButton.click(), page.waitForSelector('[data-testId="CommentEditor"]')])

    // Create new comment and submit
    const testComment = 'I am not a robot this is very yummy ' + Date.now().toString()
    const commentField = await page.$('[data-testId="CommentEditorField"]')
    const commentSubmit = await page.$('[data-testId="CommentEditorSubmit"]')
    expect(commentField).not.toBeNull()
    expect(commentSubmit).not.toBeNull()

    await commentField.click()
    await commentField.type(testComment)
    await commentSubmit.click()

    // Wait to go back to the recipe page and look for created comment
    await page.waitForFunction(() => document.querySelectorAll('[data-testId="CommentEditor"]').length === 0)
    const commentBody = await page.$x(`//text()[.='${testComment}']`)
    expect(commentBody).not.toBeNull()
  })
})

afterAll(() => browser.close())
