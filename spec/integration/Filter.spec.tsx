import { render, screen } from "@testing-library/react";
import { App } from "src/App";
import ue from "@testing-library/user-event";
import { JestStoreProvider } from "../utils/JestStoreProvider";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe("Список задач", () => {
  it("с включенным фильтром", async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });
    const btnFilterNoDoneTask = screen.getByRole("button", {
      name: /не выполненые/i,
    }) as HTMLButtonElement;

    await userEvent.click(btnFilterNoDoneTask);

    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(2);
  });

  it("с выключенным фильтром", async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });

    const btnNoFilter = screen.getByRole("button", {
      name: /отключить фильтр/i,
    }) as HTMLButtonElement;

    await userEvent.click(btnNoFilter);

    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(3);
  });

  it("Кнопки фильтра не активны", async () => {
    render(<App />, {
      wrapper: JestStoreProvider,
    });

    const btnFilterNoDoneTask = screen.getByRole("button", {
      name: /не выполненые/i,
    }) as HTMLButtonElement;
    const btnNoFilter = screen.getByRole("button", {
      name: /отключить фильтр/i,
    }) as HTMLButtonElement;

    await userEvent.click(btnFilterNoDoneTask);

    expect(btnFilterNoDoneTask).toBeDisabled();
    expect(btnNoFilter).toBeEnabled();

    await userEvent.click(btnNoFilter);

    expect(btnFilterNoDoneTask).toBeEnabled();
    expect(btnNoFilter).toBeDisabled();
  });
});
