import config from '../Config';
import TextEn from '../Config/TextEn';
import Texts from '../Config/Texts';

export function useSettings() {
    const direction = config.DIRECTION;
    
    // Returns text based on direction
    const getText = () => {
        return direction === 'rtl' ? Texts : TextEn;
    };

    const texts = getText();

    return {
        ...config,
        texts,
    };
}
