import {All_Message, SETTHEME, ClearAll, StarIcon} from './Action';
const initialState = {
  theme: 'light',
  clearAllmodal: false,
  starIcon: false,
  msg: [
    {msg: 'Cvhu', time: '2023-04-05T12:44:12+05:30'},
    {msg: 'Ccgh', time: '2023-04-05T12:44:16+05:30'},
    {msg: 'Cvhu', time: '2023-04-05T12:44:12+05:30'},
    {msg: 'Ccgh', time: '2023-04-05T12:44:16+05:30'},
    {msg: 'Cvhu', time: '2023-04-05T12:44:12+05:30'},
    {msg: 'Ccgh', time: '2023-04-05T12:44:16+05:30'},
    {msg: 'Cvhu', time: '2023-04-05T12:44:12+05:30'},
    {msg: 'Ccgh', time: '2023-04-05T12:44:16+05:30'},
    {msg: 'Cvhu', time: '2023-04-05T12:44:12+05:30'},
    {msg: 'Ccgh', time: '2023-04-05T12:44:16+05:30'},
    {msg: 'Cvhu', time: '2023-04-05T12:44:12+05:30'},
    {msg: 'Ccgh', time: '2023-04-05T12:44:16+05:30'},
    {msg: 'Cvhu', time: '2023-04-05T12:44:12+05:30'},
    {msg: 'Ccgh', time: '2023-04-05T12:44:16+05:30'},
    {msg: 'Cvhu', time: '2023-04-05T12:44:12+05:30'},
    {msg: 'Ccgh', time: '2023-04-05T12:44:16+05:30'},
    {msg: 'Cvhu', time: '2023-04-05T12:44:12+05:30'},
    {msg: 'Ccgh', time: '2023-04-05T12:44:16+05:30'},
    {msg: 'Cvhu', time: '2023-04-05T12:44:12+05:30'},
    {msg: 'Ccgh', time: '2023-04-05T12:44:16+05:30'},
    {msg: 'Cvhu', time: '2023-04-05T12:44:12+05:30'},
    {msg: 'Ccgh', time: '2023-04-05T12:44:16+05:30'},
    {msg: 'Cvhu', time: '2023-04-05T12:44:12+05:30'},
    {msg: 'Ccghlast', time: '2023-04-05T12:44:16+05:30'},
  ],
};
export const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case All_Message: {
      return {...state, msg: [...state.msg, ...action.payload]};
    }
    case SETTHEME: {
      return {...state, theme: action.payload};
    }
    case ClearAll: {
      return {...state, clearAllmodal: action.payload};
    }
    case StarIcon: {
      console.log(!state.starIcon)
      return {...state, starIcon: !state.starIcon};
    }

    default:
      return state;
  }
};
