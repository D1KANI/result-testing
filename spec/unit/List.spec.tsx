import { render, screen } from "@testing-library/react";
import { App } from "src/App";
import { List } from "src/components/List";
import { JestStoreProvider } from "../utils/JestStoreProvider";
import { store } from "src/store/configureStore";
import ue from "@testing-library/user-event";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

it("отображение списка задач", () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  const items: Task[] = [
    {
      id: "1",
      header: "купить хлеб",
      done: false,
    },
    {
      id: "2",
      header: "купить молоко",
      done: false,
    },
    {
      id: "3",
      header: "выгулять собаку",
      done: true,
    },
  ];

  const { rerender, asFragment } = render(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
  const firstRender = asFragment();

  items.pop();

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
  const secondRender = asFragment();

  expect(firstRender).toMatchDiffSnapshot(secondRender);
});

it("Список содержит не больше 10 невыполненных задач", async () => {
  render(<App />, {
    wrapper: JestStoreProvider,
  });

  const inputEl = screen.getByRole("textbox");
  const addBtnEl = screen.getByRole("button", { name: /добавить/i });

  for (let i = 0; i < 8; i++) {
    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, `${i} Todo`);
    await userEvent.click(addBtnEl);
  }
  const tasksNoDone = store.getState().taskList.list.filter((item) => !item.done);

  expect(tasksNoDone).toHaveLength(10);
  expect(addBtnEl).toBeDisabled();
  expect(inputEl).toBeDisabled();
});
