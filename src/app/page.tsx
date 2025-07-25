'use client'

import Footer from '@/components/Footer'
import ResultsTable from '@/components/ResultsTable'
import SearchBar from '@/components/SearchBar'

const MainPage = () => {
  return (
    <>
      <SearchBar />
      <ResultsTable />
      <Footer />
    </>
  )
}

export default MainPage
