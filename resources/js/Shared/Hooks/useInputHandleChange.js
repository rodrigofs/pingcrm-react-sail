import { useCallback } from 'react';

const useInputHandleChange = (setData, subForm = null) => {
    return useCallback(({ currentTarget }, callback, id = null) => {

        let value = '';
        switch (currentTarget.type) {
            case 'text':
            case 'textarea':
                value = currentTarget.dataset.lower ? currentTarget.value : currentTarget.value.toUpperCase();
                break;
            case 'checkbox':
                value = currentTarget.checked;
                break;
            case 'file':
                value = currentTarget.files ? currentTarget.files[0] : null;
                break;
            default:
                value = currentTarget.value;
        }

        const name = id ?? currentTarget.id ?? currentTarget.name;

        if (subForm)
            setData((d) => ({ ...d, [subForm]: { ...d[subForm], [name]: value } }));
        else
            setData(`${name}`, value);

        if (typeof callback === 'function') {
            let txt = '';

            if (['select', 'select-one'].includes(currentTarget.type)) {
                const opt = Array.from(currentTarget.options).find(el => el.value === value);
                txt = opt.innerText;
            }

            callback(value, txt);
        }

    }, [setData]);

};

export default useInputHandleChange;
