export const All_Message = 'ALL_Message';
export const SETTHEME = 'SETTHEME';
export const ClearAll = 'CLEARALL';
export const StarIcon = 'StarIcon';

export const setMessage = txt => {
  return {
    type: All_Message,
    payload: txt,
  };
};
export const SetTheme = txt => {
  return {
    type: SETTHEME,
    payload: txt,
  };
};
export const SetClearAll = txt => {
  return {
    type: ClearAll,
    payload: txt,
  };
};
export const SetStarIcon = txt => {
  return {
    type: StarIcon
  };
};
