import PageContainer from '../Components/PageContainer';
import { useSettings } from '../Hooks/useSettings';
import { Box } from "@mui/material";
const Reports = () => {
    const { texts } = useSettings();

    return (
        <PageContainer title={texts.REPORTS}>
            <Box></Box>
        </PageContainer>
    );
};

export default Reports;