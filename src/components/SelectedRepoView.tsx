import NoData from './NoData'
import RepoDetails from './RepoDetails'

const SelectedRepoView = ({ selectedRepo }: { selectedRepo: string }) => {
  return <>{selectedRepo ? <RepoDetails /> : <NoData />}</>
}

export default SelectedRepoView
