import React, { useEffect } from 'react';
import Item from "../Item/Item";
import './List.css';
import { storageContext } from '../../utils/storageUtils';

export default function Items() {
    const {items, itemChangeId} = React.useContext(storageContext);

    useEffect(()=>{
        const activeInput = document.querySelector('.item-input-phrase' && '.visibility-visible');

        if (activeInput) {
            activeInput.focus();
        }
    }, [itemChangeId]);

    const pathname = document.location.pathname;

    return (
        <ul className='list'>
            {
                items
                .filter(([, complete])=>{
                    return (
                        (pathname !== "/active") && (complete === true)) ||
                            ((pathname !== "/completed") && (complete !== true)
                        )
                })
                .map(([id, complete, value]) => {
                    return <Item
                        key={id + value}
                        id={id}
                        complete={complete}
                        value={value}
                        itemChangeId={itemChangeId}
                    />
                })
            }
        </ul>
    )
}
