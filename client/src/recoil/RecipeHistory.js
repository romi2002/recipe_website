import { atom } from 'recoil'

const recipeHistoryAtom = atom({
  key: 'RecommendationHistory',
  default: []
})

export default recipeHistoryAtom
