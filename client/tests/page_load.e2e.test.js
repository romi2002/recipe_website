import puppeteer from 'puppeteer'

const PAGE_URL = 'http://localhost:3002/'
const TEST_RECIPE_ID = '62e33229fb7d41f7ccbd226b'
const TEST_RECIPE_URL = PAGE_URL + 'recipes/' + TEST_RECIPE_ID
const TEST_RECIPE_TITLE = 'Giant Jerusalem Artichoke Latkes'

let browser
let page

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true, timeout: 100000 })
  page = await browser.newPage()
})

jest.setTimeout(100000)

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
  const doesTestRecipeExist = () => page.$x(`//text()[.='${TEST_RECIPE_TITLE}']`)

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

    await page.waitForTimeout(10)

    // After login, modal should be hidden
    loginModal = await page.$('[data-testId="LoginModal"]')
    expect(loginModal).toBeNull()

    // User avatar should be present in page
    const userAvatar = await page.$('[data-testId="UserAvatar"]')
    expect(userAvatar).not.toBeNull()
  })
})

afterAll(() => browser.close())
