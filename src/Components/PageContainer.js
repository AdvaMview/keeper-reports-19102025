import { useSelector } from 'react-redux';
import Card from '../Components/Card';

const PageContainer = ({ title, children }) => {
    const palette = useSelector(state => state.appSettings.selectedPalette);
    console.log('PageContainer component rendered');

    return (
        <Card
            style={{
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                width: 'calc(100% - 60px)',
                backgroundColor: palette.surface,
                minHeight: '85vh',
                padding: 24,
            }}
            title={title}
        >
            {children}
        </Card>
    );
};

export default PageContainer;