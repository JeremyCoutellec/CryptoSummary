import { MENU_OPEN, MENU_CLOSE, TOGGLE_PIN } from '../actions/types';

const initialState = {
    isOpen: localStorage.getItem('isOpenMenu') === 'true',
    pin: localStorage.getItem('pinMenu') === 'true',
};

export default function (state = initialState, action) {
    const { type } = action;

    switch (type) {
        case MENU_OPEN:
            localStorage.setItem('isOpenMenu', 'true');
            return {
                ...state,
                isOpen: true,
            };
        case MENU_CLOSE:
            localStorage.setItem('isOpenMenu', 'false');
            return {
                ...state,
                isOpen: false,
            };
        case TOGGLE_PIN:
            localStorage.setItem('pinMenu', !state?.pin ? 'true' : 'false');
            return {
                ...state,
                pin: !state?.pin,
            };
        default:
            return state;
    }
}
