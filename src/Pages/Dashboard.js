import PageContainer from "../Components/PageContainer";
import { useSettings } from "../Hooks/useSettings";
import PaginationTableParent from "../Components/PaginationTable/PaginationTableParent";
const Dashboard = ({ children, exception }) => {
  const { texts } = useSettings();

  return (
    <PageContainer title={texts.DASHBOARD}>
      {children}
      <PaginationTableParent
        exceptionId={exception?.ex_id}
        url={`${process.env.REACT_APP_API_BASE_URL}TrafficReports/GetBIReports`}
        dataFunctionName={"GetBIReports"}
        onRowDoubleClick={() => {}}
        excelFileName={exception?.ex_name}
        tableHeight={70}
        refresh={exception?.refreshResult}
      />
    </PageContainer>
  );
};

export default Dashboard;
