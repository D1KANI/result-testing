import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "src/store/configureStore";

type Props = {
    children: React.ReactNode
}

export const JestInitStoreProvider = ({})

const initialData = {
    list: [
        {
            id: '1',
            header: 'todo 1',
            done: true  
        },
        {
            id: '2',
            header: 'todo 2',
            done: false  
        },
        {
            id: '3',
            header: 'todo 3',
            done: true  
        }
    ],
    notification: '',
    filter: null
}

export const JestStoreProvider = ({ children }: Props) => (<Provider store={store}>{children}</Provider>);


