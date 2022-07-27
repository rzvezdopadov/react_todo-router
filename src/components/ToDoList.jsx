import React, { useState } from "react";
import ListHeader from "./ListHeader/ListHeader";
import List from "./List/List";
import ListFooter from "./ListFooter/ListFooter";

import {storageContext, getStorage} from "../utils/storageUtils.jsx"


export default function Container () {
    const [items, setItems] = useState(getStorage());
    const [filterItems, setFilterItems] = useState('All');
    const [itemChangeId, setItemChangeId] = useState(0);
    const [itemChangeOldValue, setItemChangeOldValue] = useState('');

    return (
        <storageContext.Provider value={{
            items, setItems,
            filterItems, setFilterItems,
            itemChangeId, setItemChangeId,
            itemChangeOldValue, setItemChangeOldValue
        }}>
            <ListHeader />
            <List />
            <ListFooter />
        </storageContext.Provider>
    )
}
