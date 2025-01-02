import { Middleware, isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import { useToast } from "./hooks/useToast";

export const rtkQueryNotificationLogger: Middleware =
  () => (next) => (action) => {
    const { notifySuccess, notifyError } = useToast();

    if (isFulfilled(action)) {
      if (action.payload.statusCode === 200) {
        notifySuccess({
          message: `${action.payload.message}`,
          options: {
            data: {
              title: "Success",
            },
          },
        });
      }
    } else if (isRejectedWithValue(action)) {
      notifyError({
        message: `${action.payload?.data?.message || "Something went wrong!"}`,
        options: {
          data: {
            title: "Hata",
          },
        },
      });
    }

    return next(action);
  };
