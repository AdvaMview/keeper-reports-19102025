import PageContainer from '../Components/PageContainer';
import { useSettings } from '../Hooks/useSettings';
import Logout from '../Pages/Logout';

const Settings = ({ children }) => {    
const {texts} = useSettings();
    return (
        <PageContainer title={texts.SETTINGS}>
            {children}
            <Logout />
        </PageContainer>
    );
};

export default Settings;