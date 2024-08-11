import { render, screen, queryByAttribute } from "@testing-library/react";
import { App } from "src/App";
import { JestStoreProvider } from "../utils/JestStoreProvider";
import ue from "@testing-library/user-event";
import { store } from "src/store/configureStore";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

const getById = queryByAttribute.bind(null, "id");

describe("Оповещение при выполнении задачи", () => {
  it("появляется и содержит заголовок задачи", async () => {
    const dom = render(<App />, {
      wrapper: JestStoreProvider,
    });

    const chackbox = getById(dom.container, "2") as HTMLElement;
    await userEvent.click(chackbox);

    const state = store.getState();

    expect(dom.container.getElementsByClassName("blackout").length).toBe(1);
    expect(state.taskList.notification).toBe('Задача "todo 2" завершена');
  });

  it("одновременно может отображаться только одно", async () => {
    const dom = render(<App />, {
      wrapper: JestStoreProvider,
    });

    const chackbox = getById(dom.container, "2") as HTMLElement;
    await userEvent.click(chackbox);

    expect(dom.container.getElementsByClassName("blackout").length).toBe(1);
  });
});
