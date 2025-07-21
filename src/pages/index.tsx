import { useState } from "react";

import Footer from "@/components/Footer";
import ResultsTable from "@/components/ResultsTable";
import SearchBar from "@/components/SearchBar";
import Welcome from "@/components/Welcome";

export default function MainPage() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <Welcome />
      <ResultsTable searchValue={searchValue} setSearchValue={setSearchValue} />
      <Footer />
    </>
  );
}
