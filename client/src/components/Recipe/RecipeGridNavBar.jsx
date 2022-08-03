import * as React from 'react'
import { Box, FormControl, InputLabel, Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import PropTypes from 'prop-types'

const SortMethodSelect = ({ sortMethod, setSortMethod }) => {
  return (
    <FormControl sx={{ minWidth: 130 }}>
      <InputLabel id="sort-method-label">Sort by</InputLabel>
      <Select
        labelId="items-per-page-label"
        id="items-per-page"
        label="Sort by"
        value={sortMethod}
        onChange={(e) => setSortMethod(e.target.value)}
      >
        <MenuItem value={'date-ascending'}>Date Added (Ascending)</MenuItem>
        <MenuItem value={'date-descending'}>Date Added (Descending)</MenuItem>
        <MenuItem value={'rating-ascending'}>Rating (Ascending)</MenuItem>
        <MenuItem value={'rating-descending'}>Rating (Descending)</MenuItem>
        {/* <MenuItem value={'alphabetical-ascending'}>Alphabetical (Ascending)</MenuItem> */}
        {/* <MenuItem value={'alphabetical-descending'}>Alphabetical (Descending)</MenuItem> */}
      </Select>
    </FormControl>
  )
}

SortMethodSelect.propTypes = {
  sortMethod: PropTypes.string,
  setSortMethod: PropTypes.func
}

const RecipeGridNavBar = ({ sortMethod, setSortMethod }) => {
  return <Box sx={{ mt: 2, mb: 2, flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'space-between' }}
              data-testid={'RecipeGridNavBar'}>
    <Box>
      <SortMethodSelect sortMethod={sortMethod} setSortMethod={setSortMethod}/>
    </Box>
  </Box>
}

RecipeGridNavBar.propTypes = {
  sortMethod: PropTypes.string,
  setSortMethod: PropTypes.func
}

export default RecipeGridNavBar
