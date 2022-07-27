import React from "react";
import "./ListFooter.css"
import { setStorage, storageContext } from '../../utils/storageUtils';
import { Link } from "react-router-dom";

export default function ItemFooter() {
    const {items, setItems, setFilterItems} = React.useContext(storageContext);

    const itemsLeft = items.reduce((previousValue, [, complete]) => previousValue + !complete, 0);
    const itemsRight = items.length - itemsLeft;
    const classVisibilityHidden = itemsRight ? '' : ' visibility-hidden';

    let filterAll = '';
    let filterActive =  '';
    let filterCompleted =  '';

    const pathname = document.location.pathname;

    if (pathname === "/completed") {
        filterCompleted = ' filter-selected'
    } else if (pathname === "/active") {
        filterActive = ' filter-selected'
    } else {
        filterAll = ' filter-selected'
    }

    function handleClearCompleteItems() {
        const itemsNew = items.filter(([, complete]) => complete === false);

        setItems(itemsNew);
        setStorage(itemsNew);
    }

    return (
        <div className='list-footer'>
            <span className='list-footer-counter'>{itemsLeft} items left</span>
            <ul className='list-footer-filters'>
                <li
                    onClick={() => setFilterItems('All')}
                    className={'list-footer-filters-content' + filterAll}
                ><Link className="list-footer-filters-link" to="/all">All</Link></li>
            
                <li
                    onClick={() => setFilterItems('Active')}
                    className={'list-footer-filters-content' + filterActive}
                ><Link className="list-footer-filters-link" to="/active">Active</Link></li>

                <li
                    onClick={() => setFilterItems('Completed')}
                    className={'list-footer-filters-content' + filterCompleted}
                ><Link className="list-footer-filters-link" to="/completed">Completed</Link></li>
            </ul>

            <button className={'list-footer-item-completed-destroy' + classVisibilityHidden}
                onClick={handleClearCompleteItems}
            >Clear completed</button>
        </div>
    )
}

