import {useCallback} from 'react'

const useTabToEnter = () => {
    return useCallback((event) => {
        if (event.keyCode === 13 && (event.target.nodeName === 'INPUT' || event.target.nodeName === 'SELECT' || event.target.nodeName === 'BUTTON')) {
            const form = event.target.form

            if (form === null)
                return

            const index = Array.prototype.indexOf.call(form, event.target)
            let nextFocused = index + 1

            if (typeof form.elements[nextFocused] !== 'undefined') {
                while (form.elements[nextFocused].disabled || form.elements[nextFocused].type === 'hidden' || form.elements[nextFocused].type === 'search') nextFocused++
                form?.elements[nextFocused]?.focus()
            }
            event.preventDefault()
        }
    }, [])
}

export default useTabToEnter
