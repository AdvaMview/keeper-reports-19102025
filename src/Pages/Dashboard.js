import PageContainer from "../Components/PageContainer";
import { useSettings } from "../Hooks/useSettings";
// import PaginationTable from "../Components/PaginationTable";
import PaginationTableParent from "../Components/PaginationTable/PaginationTableParent";
const Dashboard = ({ children }) => {
  const { texts } = useSettings();

  return (
    <PageContainer title={texts.DASHBOARD}>
      {children}
      <PaginationTableParent
        exceptionId={exception?.ex_id}
        url={`${process.env.REACT_APP_API_BASE_URL}RadioException/ExceptionData`}
        dataFunctionName={"ExceptionData"}
        onRowDoubleClick={() => {}}
        excelFileName={exception?.ex_name}
        tableHeight={70}
        refresh={exception?.refreshResult}
      />
      {/* <PaginationTable /> */}
    </PageContainer>
  );
};

export default Dashboard;
