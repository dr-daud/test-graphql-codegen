import { useState } from 'react'

import {
  SearchRepositoriesQuery,
  useSearchRepositoriesQuery,
} from '@/app/api/generated'

import Footer from '@/components/Footer'
import ResultsTable from '@/components/ResultsTable'
import SearchBar from '@/components/SearchBar'
import Welcome from '@/components/Welcome'

export default function MainPage() {
  const [searchValue, setSearchValue] = useState('')
  const [querySearchValue, setQuerySearchValue] = useState('')
  const { data } = useSearchRepositoriesQuery(
    { query: querySearchValue, first: 10 },
    { skip: !querySearchValue },
  )

  console.log(data)
  return (
    <>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setQuerySearchValue={setQuerySearchValue}
      />
      {data ? <ResultsTable data={data} /> : <Welcome />}
      <Footer />
    </>
  )
}
