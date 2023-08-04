import React from "react";
import { render } from "@testing-library/react";
import CustomSnackbar from "../Components/SnackBar";

describe("CustomSnackbar component tests", () => {
  test("does not render the snackbar when 'open' prop is false", () => {
    const { queryByText } = render(
      <CustomSnackbar
        open={false}
        message="This should not be visible"
        onClose={() => {}}
        severity="error"
      />
    );

    const snackbarElement = queryByText("This should not be visible");
    expect(snackbarElement).toBeNull();
  });
});
