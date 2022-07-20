import * as React from 'react'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Search from '../../api/search'

const floatingBoxStyle = {
  width: '300px',
  background: 'white',
  zIndex: 10,
  border: 1,
  transform: 'translate(0px, 50px)',
  position: 'absolute',
  borderRadius: '0 0 10px 10px'
}

const SearchBarRecommendations = ({ query, recommendations }) => {
  return (<Box sx={floatingBoxStyle}>
    {recommendations.map((recipe, index) => {
      return (<Box key={'recommendation-' + index}>
        <Button component={Link} to={'/recipes/' + recipe._id.toString()} variant="text">
          <Typography>
            <span style={{ fontWeight: 'bold' }}>{recipe.title.substring(0, query.length)}</span>
            {recipe.title.substring(query.length)}
          </Typography>
        </Button>
      </Box>)
    })}
  </Box>)
}

SearchBarRecommendations.propTypes = {
  query: PropTypes.string,
  recommendations: PropTypes.array
}

// TODO add clear button
const SearchBarTextField = ({ query, setQuery, recommendations }) => {
  return (<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
    <Box sx={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
      <Button star component={Link} to={'/recipes/search/' + query} startIcon={<SearchIcon fontSize={'large'}/>}/>
      <TextField sx={{ minWidth: '300px' }} variant="outlined" label="Search"
                 onChange={(e) => setQuery(e.target.value)}/>
    </Box>
    {recommendations.length !== 0 && <SearchBarRecommendations query={query} recommendations={recommendations}/>}
  </Box>)
}

SearchBarTextField.propTypes = {
  query: PropTypes.string, setQuery: PropTypes.func, recommendations: PropTypes.array
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

  return (<Box sx={{ display: 'flex', m: 2 }}>
    <SearchBarTextField query={query} setQuery={setQuery} recommendations={typeahead}/>
  </Box>)
}

SearchBar.propTypes = {
  onSearch: PropTypes.func
}

export default SearchBar
