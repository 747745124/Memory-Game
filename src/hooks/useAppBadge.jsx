import { useState } from 'react';

const useAppBadge = () => {
    const [counter, setCounter] = useState(1);
    const setBadge = () => {
        if (navigator.setAppBadge) {
            navigator.setAppBadge(counter);
        } else {
            navigator.setClientBadge();
        }

    };
    const clearBadge = () => {
        setCounter(1);
        if (navigator.clearAppBadge) {
            navigator.clearAppBadge();
        }
        else if (navigator.clearClientBadge) {
            navigator.clearClientBadge();
        }

    };

    return [setBadge, clearBadge];

}

export default useAppBadge;