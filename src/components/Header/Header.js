import React, { useEffect, useState } from 'react'
import {
  Box,
  Input,
  InputAdornment
} from '@mui/material'
import Logo from 'assets/images/uaroundu_profile_logo.webp'
import SearchIcon from '@mui/icons-material/Search'

const Header = ({ value }) => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    setSearch(value)
  }, [value])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' , backgroundColor:'white'}}>
      <Box sx={{ mr: 10, width: '96px', height: '96px' }}><img src={Logo} alt="" style={{ width: '100%', height: '100%' }} /></Box>
      <Input
        value={search}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </Box>
  )
}

export default Header
