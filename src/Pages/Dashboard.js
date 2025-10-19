import PageContainer from '../Components/PageContainer';
import { useSettings } from '../Hooks/useSettings';

const Dashboard = ({ children }) => {
    const {texts} = useSettings();

    return (
        <PageContainer title={texts.DASHBOARD}>
            {children}
        </PageContainer>
    );
};

export default Dashboard;