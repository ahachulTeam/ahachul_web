import React from "react";

import { describe, expect, it, vi } from "vitest";
import { render, screen, userEvent, waitFor } from "../../../test/test-utils";

import { composeStories } from "@storybook/react";
import * as stories from "./Toast.stories";

const { ToastStory } = composeStories(stories);

describe("Toast 컴포넌트 테스트", () => {
  it("Toast 클릭 시 Toast가 잘 뜨는지 확인", async () => {
    // GIVEN
    render(<ToastStory />);

    // WHEN
    const button = screen.getByRole("button");
    userEvent.click(button);

    // THEN
    await waitFor(() => {
      expect(screen.getByText("Hello, World!")).toBeInTheDocument();
    });
  });

  it("Toast 클릭 후 3초 뒤  Toast가 사라지는지 확인", async () => {
    // GIVEN
    vi.useFakeTimers();
    const { container } = render(<ToastStory />);

    // WHEN
    const button = screen.getByRole("button");
    userEvent.click(button);

    const toastContainer = container.querySelector("#toast-container");

    // THEN
    await vi.advanceTimersByTimeAsync(3001);
    expect(toastContainer?.hasChildNodes()).toBeFalsy();
  });
});
