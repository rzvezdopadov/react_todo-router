import React from "react";
import './Item.css';
import { setStorage, storageContext } from "../../utils/storageUtils";

export default function Item({id, complete, value}) {
    const {
        items, setItems,
        itemChangeId, setItemChangeId,
        itemChangeOldValue, setItemChangeOldValue,
    } = React.useContext(storageContext);

    const itemComplete = complete ? ' item-complete' : '';
    const classVisibilityVisible = id === itemChangeId ? ' visibility-visible' : '';

    function handleToogleItem() {
        for (let i = 0; i < items.length; i++) {
            const [idItems] = items[i];

            if (idItems === id) {
                items[i][1] = items[i][1] ? false : true;

                setItems([...items]);
                setStorage(items);

                break;
            }
        }
    }

    function handleDestroyItem() {
        for (let i = 0; i < items.length; i++) {
            const [idItems] = items[i];

            if (idItems === id) {
                items.splice(i, 1);

                setItems([...items]);
                setStorage(items);

                break;
            }
        }
    }

    function handleDblClickItem(id, value) {
        setItemChangeId(id)
        setItemChangeOldValue(value);
    }

    function handleOnBlurItem(e) {
        if (e.target.value === '') {
            e.target.value = itemChangeOldValue;
            setItemChangeId(0);

            return;
        }

        for (let i = 0; i < items.length; i++) {
            const [id] = items[i];

            if (itemChangeId === id) {
                items[i][2] = e.target.value;

                setItems([...items]);
                setStorage(items);

                break;
            }
        }

        setItemChangeId(0);
    }

    return (
        <li className='item'>
            <div className='item-main-wrapper'>
                <span className={'item-toggle' + itemComplete}
                   onClick={handleToogleItem}
                >&#10003;</span>

                <label className='item-phrase'
                    onDoubleClick={handleDblClickItem.bind(this, id, value)}
                >{value}</label>

                <button className='item-destroy'
                    onClick={handleDestroyItem}
                >X</button>
            </div>

            <input className={'item-input-phrase' + classVisibilityVisible}
                defaultValue={value}
                onBlur={handleOnBlurItem}
            />
        </li>
    )
}
