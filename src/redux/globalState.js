const initialState = {
  home: [],
  activities: [],
  socialMedia: {
    instagram: "",
    facebook: "",
    correo: "",
  },
  scheduleEvents: [],
  dataUpdate: {},
  openUpdate: false,
  isUserLoggedIn: false,
};

// Nombres de acciones
export const HOME = "HOME";
export const SOCIAL_MEDIA = "SOCIAL_MEDIA";
export const ACTIVITIES = "ACTIVITIES";
export const SCHEDULE_FORM = "SCHEDULE_FORM";
export const DATA_UPDATES = "DATA_UPDATES";
export const RESET_DATA_UPDATE = "RESET_DATA_UPDATE";
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";

function globalState(state = initialState, action) {
  switch (action.type) {
    case HOME:
      return {
        ...state,
        home: {
          ...action.payload.data,
        },
      };
    case ACTIVITIES:
      return {
        ...state,
        activities: [...state.activities, action.payload.data],
      };

    case SOCIAL_MEDIA:
      return {
        ...state,
        socialMedia: {
          ...action.payload.data,
        },
      };
    case DATA_UPDATES:
      return {
        ...state,
        dataUpdate: { ...action.payload.data },
      };
    case RESET_DATA_UPDATE:
      return {
        ...state,
        openUpdate: action.payload.data,
      };
    case SCHEDULE_FORM:
      return {
        ...state,
        scheduleEvents: [...state.scheduleEvents, action.payload.data],
      };
    case LOGIN:
      return {
        ...state,
        isUserLoggedIn: action.payload.data,
      };
    case LOGOUT:
      localStorage.removeItem("Islam_auth_token");
      window.location.reload();
      return {
        ...state,
        isUserLoggedIn: false,
      };
    default:
      return state;
  }
}

export default globalState;
