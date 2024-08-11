import { render, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { List } from "src/components/List";
import { NewTaskBar } from "src/modules/NewTaskBar";
import { JestStoreProvider } from "../utils/JestStoreProvider";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe("Элемент списка задач", () => {
  it("название не должно быть больше 32 символов", async () => {
    render(<NewTaskBar />, {
      wrapper: JestStoreProvider,
    });

    const inputEl = screen.getByRole("textbox");
    const addBtnEl = screen.getByRole("button", { name: /добавить/i });

    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, "Это задача с симваломи больше 32 как то так");

    expect(addBtnEl).toBeDisabled();
  });

  it("название не должно быть пустым", async () => {
    render(<NewTaskBar />, {
      wrapper: JestStoreProvider,
    });

    const inputEl = screen.getByRole("textbox");
    const addBtnEl = screen.getByRole("button", { name: /добавить/i });

    await userEvent.clear(inputEl);

    expect(addBtnEl).toBeDisabled();
  });

  it("нельзя удалять невыполненные задачи", async () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    const tasks: Task[] = [
      {
        id: "1",
        header: "Todo 1",
        done: false,
      },
    ];

    render(<List items={tasks} onDelete={fn1} onToggle={fn2} />);

    const btnDelete = screen.getByRole("button", { name: /Удалить/i }) as HTMLButtonElement;

    expect(btnDelete).toBeDisabled();
  });

  it("Задачу можно удалить если выполнена", async () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    const tasks: Task[] = [
      {
        id: "1",
        header: "Todo 1",
        done: true,
      },
    ];

    render(<List items={tasks} onDelete={fn1} onToggle={fn2} />);

    const btnDelete = screen.getByRole("button", { name: /Удалить/i }) as HTMLButtonElement;

    expect(btnDelete).toBeEnabled();
  });

  it("название должно быть меньше 32 символов", async () => {
    render(<NewTaskBar />, {
      wrapper: JestStoreProvider,
    });

    const inputEl = screen.getByRole("textbox");
    const addBtnEl = screen.getByRole("button", { name: /добавить/i }) as HTMLButtonElement;

    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, "Это задача с названием меньше 32");

    expect(addBtnEl).toBeEnabled();
  });
});
