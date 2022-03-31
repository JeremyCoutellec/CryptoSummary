export const setMenuOpen = (isMenuOpen) => (dispatch) => {
    if (isMenuOpen) {
        dispatch({
            type: 'MENU_OPEN',
        });
    } else {
        dispatch({
            type: 'MENU_CLOSE',
        });
    }
};

export const togglePin = () => (dispatch) =>
    dispatch({
        type: 'TOGGLE_PIN',
    });
