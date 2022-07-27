import React from "react";
import "./ListHeader.css"
import { setStorage, storageContext } from "../../utils/storageUtils";

export default function ItemHeader() {
    const {items, setItems} = React.useContext(storageContext);

    function handleArrowClick() {
        let flagCompleteItem = true;

        for (let i = 0; i < items.length; i++) {
            const [, complete] = items[i];

            if (complete === false) {
                flagCompleteItem = false;

                break;
            }
        }

        if (flagCompleteItem) {
            items.forEach((value, i) => items[i][1] = false)
        } else {
            items.forEach((value, i) => items[i][1] = true)
        }

        setItems([...items]);
        setStorage(items);
    }

    function handleAddNewItem(e) {
        if (['Enter', 'NumpadEnter'].includes(e.code)) {
            if (e.target.value) {

                items.push([Date.now(), false, e.target.value]);

                setItems([...items]);
                setStorage(items);

                e.target.value = '';
            }
        }
    }

    const itemsLeft = items.reduce((previousValue, [, complete]) => previousValue + complete, 0);
    const itemsAll = items.length;
    const arrowSymbol = itemsLeft !== itemsAll ? ' list-header-arrow-down' : ' list-header-arrow-up';

    return (
        <div className='list-header'>
            <label className={'list-header-arrow' + arrowSymbol}
                onClick = {handleArrowClick}
            ></label>

            <input className='list-header-input'
                onKeyPress = {handleAddNewItem}
            ></input>
        </div>
    )
}
