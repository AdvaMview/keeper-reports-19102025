import PageContainer from '../Components/PageContainer';
import { useSettings } from '../Hooks/useSettings';

const Reports = () => {
    const { texts } = useSettings();

    return (
        <PageContainer title={texts.REPORTS}>
            <div></div>
        </PageContainer>
    );
};

export default Reports;