import { atom } from 'recoil'

export const sortSelectionAtom = atom({
  key: 'sortSelection',
  default: 'date-descending'
})
