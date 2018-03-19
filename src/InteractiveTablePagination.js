import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class InteractiveTablePagination extends Component {
    constructor(props) {
        super(props);
        this.handleCurrentPage = this.handleCurrentPage.bind(this);
        this.changeCurrentPage = this.changeCurrentPage.bind(this);
        this.showAllRows = this.showAllRows.bind(this);
    }

    handleCurrentPage(event) {
        const type = event.currentTarget.getAttribute('data-counter');
        this.props.onHandleCurrentPage(type);
    }
    
    changeCurrentPage(event) {
        this.props.onChangeCurrentPage(parseInt(event.currentTarget.value, 10) - 1);
    }
    
    showAllRows(event) {
        this.props.onShowAllRows(event.target.checked);
    }

    render () {
        const {currentPagenumber, showAllRows, pageCount, paging} = this.props;
        const PreviousBtnText = paging.prevBtn && typeof paging.prevBtn === 'string'
            ?  (paging.prevBtn)
            : 'prev';
        const NextBtnText = paging.nextBtn && typeof paging.nextBtn === 'string'
            ?  (paging.nextBtn)
            : 'next';
        const showAllText = paging.showAllText && typeof paging.showAllText === 'string'
            ?  (paging.showAllText)
            : 'show all';
        return (
            <div className="pagination-container">
                <button className="pagination-control" data-counter="dec" onClick={this.handleCurrentPage} disabled={currentPagenumber <= 0 || showAllRows}>{PreviousBtnText}</button>
                <span>
                    <span style={{color: (showAllRows ? '#a7a7a7' : '#666666')}}>
                        <select value={currentPagenumber + 1} data-counter="set" onChange={this.changeCurrentPage} disabled={showAllRows}>
                            {Array.apply(null, {length: pageCount}).map(Number.call, Number).map((counter, index) => {
                                return <option key={index} value={counter+1}>{counter + 1}{paging.joinPages && ' / ' + pageCount}</option>;
                            })}
                        </select>
                        {!paging.joinPages && ' / ' + pageCount}
                    </span>
                    {paging.showAll &&
                        <div className="show-all-container">
                            <input id="show-all" type="checkbox" checked={showAllRows} onChange={this.showAllRows}/>
                            <label htmlFor="show-all">{showAllText}</label>
                        </div>
                    }
                </span>
                <button className="pagination-control" data-counter="inc" onClick={this.handleCurrentPage} disabled={currentPagenumber + 1 >= pageCount || showAllRows}>{NextBtnText}</button>
            </div>
        );
    }
}

InteractiveTablePagination.propTypes = {
    currentPagenumber: PropTypes.number.isRequired,
    showAllRows: PropTypes.bool,
    pageCount: PropTypes.number.isRequired,
    paging: PropTypes.object.isRequired,
    onHandleCurrentPage: PropTypes.func,
    onChangeCurrentPage: PropTypes.func,
    onShowAllRows: PropTypes.func,
}