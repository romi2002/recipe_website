import * as React from 'react'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, TextField } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Search from '../../api/search'

const SearchBarRecommendations = ({ recommendations }) => {
  return (<Box sx={{ zIndex: 1, width: '300px', border: 1 }}>
    {recommendations.map((recipe, index) => {
      return (<Box key={'recommendation-' + index}>
        <Button component={Link} to={'/recipes/' + recipe._id.toString()} variant="text">
          {recipe.title}
        </Button>
      </Box>)
    })}
  </Box>)
}

SearchBarRecommendations.propTypes = {
  recommendations: PropTypes.array
}

// TODO add clear button
const SearchBarTextField = ({ setQuery, recommendations }) => {
  return (<Box sx={{ display: 'flex', alignItems: 'flexStart' }}>
    <SearchIcon fontSize={'large'}/>
    <Box>
      <TextField sx={{ minWidth: '300px' }} variant="outlined" label="Search"
                 onChange={(e) => setQuery(e.target.value)}/>
      {recommendations.length !== 0 && <SearchBarRecommendations recommendations={recommendations}/>}
    </Box>
  </Box>)
}

SearchBarTextField.propTypes = {
  setQuery: PropTypes.func,
  recommendations: PropTypes.array
}

const SearchBar = ({ onSearch }) => {
  const [typeahead, setTypeahead] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (query === '') {
      setTypeahead([])
      return
    }
    Search.typeahead(query).then((res) => {
      if (res.data == null) {
        return
      }

      setTypeahead(res.data.data)
    })
  }, [query])

  return (<Box sx={{ m: 2 }}>
    <SearchBarTextField setQuery={setQuery} recommendations={typeahead}/>
    <Button variant="contained" onClick={onSearch(query)}>
      Search
    </Button>
  </Box>)
}

SearchBar.propTypes = {
  onSearch: PropTypes.func
}

export default SearchBar
