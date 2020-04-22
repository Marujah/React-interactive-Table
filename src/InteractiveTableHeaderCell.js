import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class InteractiveTableHeaderCell extends Component {

    onHeaderItemClick(item) {
        this.props.onHeaderItemClick(item, this.props.dataId);
    }

    getSortingIcon(sortingItem) {
        let upClassName = ['icon', 'triangle-up'];
        let downClassName = ['icon', 'triangle-down'];
        if (sortingItem.sortable) {
            if (sortingItem.active) {
                if (this.props.sorting) {
                    upClassName.push('active');
                    const index = downClassName.indexOf('active');
                    if (index > -1) {
                        downClassName.slice(index, 1);
                    }
                    console.log('upClassName', upClassName);
                } else {
                    downClassName.push('active');
                    const index = upClassName.indexOf('active');
                    if (index > -1) {
                        upClassName.slice(index, 1);
                    }
                }
            } else {
                const indexUp = upClassName.indexOf('active');
                const indexDown = downClassName.indexOf('active');
                if (indexUp > -1) {
                    upClassName.slice(indexUp, 1);
                }
                if (indexDown > -1) {
                    downClassName.slice(indexDown, 1);
                }
            }
        }
        const icon = ((
            <span className="icons-container">
                <svg className={upClassName.join(' ')}>
                    <use xlinkHref='#icon-triangle-up'/>
                </svg>
                <svg className={downClassName.join(' ')}>
                    <use xlinkHref='#icon-triangle-down'/>
                </svg>
            </span>
        ));
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

InteractiveTableHeaderCell.propTypes = {
    dataId: PropTypes.number.isRequired,
    style: PropTypes.object,
    sortingActiveState: PropTypes.bool.isRequired,
    headerItem: PropTypes.object.isRequired,
    sorting: PropTypes.oneOfType([() => {
        return null;
    }, PropTypes.bool]),
    onHeaderItemClick: PropTypes.func.isRequired
};

