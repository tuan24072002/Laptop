import { Action, Dispatch } from "@reduxjs/toolkit";
export const customMiddleware =
  ({ dispatch }: { dispatch: Dispatch<Action> }) =>
  (next: (arg0: any) => void) =>
  (action: any) => {
    if (action.payload) {
      // const { message } = action.payload;
      // if (message) {
      //   if (
      //     message === "Invalid refresh token!" ||
      //     message === "Refresh token is expired!" ||
      //     message === "Token is no longer valid!" ||
      //     message === "Refresh token is required!"
      //   ) {
      //     dispatch(setLogined(false));
      //     dispatch(setUser(null));
      //     AuthService.logout();
      //     window.location.href = "/";
      //     return;
      //   }
      // }
    }
    next(action);
  };
