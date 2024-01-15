import { useState } from 'react';

function useShowFullContent() {
    const [showFullContent, setShowFullContent] = useState(false);

    const handleToggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    return [showFullContent, handleToggleContent];
}
export default useShowFullContent;