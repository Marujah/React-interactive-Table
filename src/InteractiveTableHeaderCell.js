import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class InteractiveTableHeaderCell extends Component {

    onHeaderItemClick(item) {
        this.props.onHeaderItemClick(item, this.props.dataId);
    }

    getSortingIcon(sortingItem) {
        let icon;
        if (sortingItem.sortable) {
            if (sortingItem.active) {
                if (this.props.sorting) {
                    icon = (
                        <svg className="icon">
                            <use xlinkHref='#icon-triangle-up'/>
                        </svg>
                    );
                } else {
                    icon = (
                        <svg className="icon">
                            <use xlinkHref='#icon-triangle-down'/>
                        </svg>
                    );
                }
            } else {
                icon = (
                    <svg className="icon">
                        <use xlinkHref='#icon-sort'/>
                    </svg>
                );
            }
        }
        return icon;
    }

    render() {
        const {style, headerItem} = this.props;
        return (
            <div
                className="cell"
                style={{...style}}
                onClick={this.onHeaderItemClick.bind(this, headerItem)}>
                {headerItem.alias}
                {this.getSortingIcon(headerItem)}
            </div>
        );
    }
}

AwesomeTableHeaderCell.propTypes = {
    dataId: PropTypes.number.isRequired,
    style: PropTypes.object,
    sortingActiveState: PropTypes.bool.isRequired,
    headerItem: PropTypes.object.isRequired,
    sorting: PropTypes.oneOfType([() => {return null}, PropTypes.bool]),
    onHeaderItemClick: PropTypes.func.isRequired
}

