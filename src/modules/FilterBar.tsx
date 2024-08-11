import { useDispatch, useSelector } from "react-redux";
import { TypeFilter, getFilter, setFilter } from "src/store/taskSlice";

import "./styles.css";
import { Button } from "src/components/Button";

export const FilterBar = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleFilter = (value: TypeFilter | null) => {
    dispatch(setFilter(value))
  }

  return (
    <div className="new-task-bar">
        <Button
         dataAlt="отключить фильтр"
         disabled={!filter}
         onClick={() => handleFilter(null)}
         >Отключить фильтр</Button>
        <Button 
            dataAlt="не выполненые"
            disabled={filter === 'noDone'}
            onClick={() => handleFilter('noDone')}
        >Не выполненые</Button>
        <Button
            dataAlt="выполненые"
            disabled={filter === 'done'}
            onClick={() => handleFilter('done')}
        >Только выполненые</Button>
    </div>
  );
};