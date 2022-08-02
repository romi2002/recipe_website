import * as React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import PropTypes from 'prop-types'

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

IngredientSearchBar.propTypes = {
  ingredientOptions: PropTypes.array,
  onChange: PropTypes.func,
  defaultValues: PropTypes.array
}

export default IngredientSearchBar
