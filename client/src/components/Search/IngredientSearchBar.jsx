import * as React from 'react'
import { Autocomplete, TextField } from '@mui/material'

const IngredientSearchBar = ({ ingredientOptions, onChange, defaultValues = [] }) => {
  return (
    <>
      {ingredientOptions != null && <Autocomplete sx={{ minWidth: '400px' }}
                                                  multiple
                                                  options={ingredientOptions}
                                                  getOptionLabel={(opt) => opt.text}
                                                  filterSelectedOptions
                                                  defaultValue={defaultValues}
                                                  renderInput={(params) => (
                                                    <TextField
                                                      {...params}
                                                      label={'Ingredient Search'}
                                                      placeholder={'Ingredients'}/>
                                                  )}
                                                  onChange={onChange}/>}
    </>
  )
}

export default IngredientSearchBar
