import PageContainer from "../Components/PageContainer";
import { useSettings } from "../Hooks/useSettings";
// import PaginationTableParent from "../Components/PaginationTable/PaginationTableParent";
const Dashboard = ({ children }) => {
  const { texts } = useSettings();

  return (
    <PageContainer title={texts.DASHBOARD}>
      {children}
      {/* <PaginationTableParent /> */}
    </PageContainer>
  );
};

export default Dashboard;
