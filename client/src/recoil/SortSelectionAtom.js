import { atom } from 'recoil'

const sortSelectionAtom = atom({
  key: 'sortSelection',
  default: 'date-descending'
})

export default sortSelectionAtom
