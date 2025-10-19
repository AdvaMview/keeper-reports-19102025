import PageContainer from '../Components/PageContainer';
import { useSettings } from '../Hooks/useSettings';

const Settings = ({ children }) => {    
const {texts} = useSettings();
    return (
        <PageContainer title={texts.SETTINGS}>
            {children}
        </PageContainer>
    );
};

export default Settings;