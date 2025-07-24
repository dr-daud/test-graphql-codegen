import { useState } from 'react'

import Footer from '@/components/Footer'
import ResultsTable from '@/components/ResultsTable'
import SearchBar from '@/components/SearchBar'

const MainPage = () => {
  const [searchValue, setSearchValue] = useState('')
  const [querySearchValue, setQuerySearchValue] = useState('')

  return (
    <>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setQuerySearchValue={setQuerySearchValue}
      />

      <>
        <ResultsTable querySearchValue={querySearchValue} />
      </>
      <Footer />
    </>
  )
}

export default MainPage
