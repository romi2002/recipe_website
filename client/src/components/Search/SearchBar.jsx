import * as React from 'react'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, CircularProgress, Paper, TextField } from '@mui/material'
import Search from '../../api/search'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate()
  const [typeahead, setTypeahead] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (query === '') {
      setLoading(false)
      setTypeahead([])
      return
    }
    Search.typeahead(query).then((res) => {
      if (res.data == null) {
        return
      }

      setLoading(false)
      setTypeahead(res.data.data)
    })
  }, [query])

  return (<Paper sx={{ display: 'flex', m: 2, p: 1 }}>
    <Autocomplete
      sx={{ width: '400px' }}
      freeSolo
      disableClearable
      options={typeahead}
      getOptionLabel={(option) => option.title}
      onChange={(e, value) => {
        // Workaround if the user presses enter on input, run search
        if (typeof value === 'string') {
          navigate('/recipes/search/' + value)
          return
        }

        navigate('/recipes/' + value._id)
      }}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.title, inputValue)
        const parts = parse(option.title, matches)

        return (<li {...props}>
          <div>
            {parts.map((part, index) => (<span
              key={index}
              style={{
                fontWeight: part.highlight ? 700 : 400
              }}
            >
                  {part.text}
                </span>))}
          </div>
        </li>)
      }}
      renderInput={(params) => {
        return (<TextField
          {...params}
          label="Search"
          InputProps={{
            ...params.InputProps,
            type: 'search',
            endAdornment: (<>
              {loading && <CircularProgress/>}
            </>)
          }}
          onChange={(e) => {
            setQuery(e.target.value)
            setLoading(true)
          }}
        />)
      }}/>
  </Paper>)
}

SearchBar.propTypes = {
  onSearch: PropTypes.func
}

export default SearchBar
