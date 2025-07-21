import { useSearchRepositoriesQuery } from "@/app/api/generated";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Stack,
} from "@mui/material";
import { useState } from "react";


interface Props {
  searchValue: string;
}

const ResultsTable = ({ searchValue }: Props) => {

  const {data} = useSearchRepositoriesQuery({query: searchValue, first: 10})
  console.log(data)
  const [selectedRepo, setSelectedRepo] = useState<number | undefined>();
  const [currentPage, setCurrentPAge] = useState();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // const handleSort = (key: string) => {
  //   setSortConfig((prev) => ({
  //     key,
  //     direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
  //   }));
  // };

  return (
    <Stack sx={{ flexDirection: "row" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Результаты поиска">
          <TableHead>
            <TableRow sx={{ cursor: "pointer" }}>
              <TableCell>Название</TableCell>
              <TableCell>Язык</TableCell>
              <TableCell>
                Число форков
              </TableCell>
              <TableCell >
                Число звезд
              </TableCell>
              <TableCell >
                Дата обновления
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.search?.nodes?.map((repo, index) =>{
              console.log(repo?.__typename === "Repository")
              return (
                 repo?.__typename === "Repository" ? (
                <TableRow
                  onClick={() => setSelectedRepo(index)}
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                    backgroundColor: `${selectedRepo === index ? "#2196F30A" : "#fff"}`,
                  }}
                >
                  <TableCell component="th" scope="row">
                    {repo.name}
                  </TableCell>
                  <TableCell>{repo.primaryLanguage?.name}</TableCell>
                  <TableCell>{repo.forkCount}</TableCell>
                  <TableCell>{repo.stargazerCount}</TableCell>
                  <TableCell>{repo.updatedAt}</TableCell>
                </TableRow>
              ) : null
              )
            }
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ backgroundColor: "#F2F2F2", width: "480px" }}>
        <Box
          sx={{
            fontSize: "14px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          Выберите репозиторий
        </Box>
      </Box>
    </Stack>
  );
};

export default ResultsTable;
