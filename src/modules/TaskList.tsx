import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "src/components/Empty";
import { List } from "src/components/List";
import { deleteTask, getFilter, tasksSelector, toggleTask } from "src/store/taskSlice";

export const TaskList = () => {
  const items = useSelector(tasksSelector);
  const filter = useSelector(getFilter)
  const dispatch = useDispatch();

  const handleDelete = (id: Task["id"]) => {
    dispatch(deleteTask(id));
  };

  const handleToggle = (id: Task["id"]) => {
    dispatch(toggleTask(id));
  };

  const itemsFilter: Task[] = useMemo(() => {
    if(filter) {
      return items.filter(item => filter === 'done' ? item.done : !item.done)
    }
    return items
  }, [filter, items])

  return itemsFilter.length > 0 ? (
    <List items={itemsFilter} onDelete={handleDelete} onToggle={handleToggle} />
  ) : (
    <Empty />
  );
};
