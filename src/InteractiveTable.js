import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InteractiveTableHeaderCell from './InteractiveTableHeaderCell';
import InteractiveTablePagination from './InteractiveTablePagination';

export default class InteractiveTable extends Component {
    constructor(props){
      super(props);
      this.state= {
        initialItems: props.dataList,
        items: [],
        sorting: null,
        sortValue: '',
        MyAwesomeTableStyles: {},
        currentPagenumber: 0,
        showAllRows: false,
        personsTableHeader: Object.keys(props.columns),
        tableStyles: ''
      }
      this.filterSearch = this.filterSearch.bind(this);
      this.sortTable = this.sortTable.bind(this);
      this.asc = this.asc.bind(this);
      this.desc = this.desc.bind(this);
      this.headerItemClick = this.headerItemClick.bind(this);
      this.handleCurrentPage = this.handleCurrentPage.bind(this);
      this.changeCurrentPage = this.changeCurrentPage.bind(this);
      this.showAllRows = this.showAllRows.bind(this);
    }

    asc(a, b) {
        const {sortValue} = this.state;
        if (typeof a[sortValue] === 'undefined') return 0;
        if (typeof a[sortValue] === 'number') return (a[sortValue] - b[sortValue]);
        if (a[sortValue].toLowerCase() < b[sortValue].toLowerCase())
          return -1;
        if (a[sortValue].toLowerCase() > b[sortValue].toLowerCase())
          return 1;
        return 0;
    }

    desc(a, b) {
        const {sortValue} = this.state;
        if (typeof a[sortValue] === 'undefined') return 0;
        if (typeof a[sortValue] === 'number') return (b[sortValue] - a[sortValue]);
        if (a[sortValue].toLowerCase() < b[sortValue].toLowerCase())
          return 1;
        if (a[sortValue].toLowerCase() > b[sortValue].toLowerCase())
          return -1;
        return 0;
    }

    sortTable(sortingKey) {
        let updatedList = this.state.items;
        this.setState({
            sortValue: sortingKey,
            sorting: !this.state.sorting
        },
        () => {
            if (this.state.sorting) {
                updatedList = updatedList.sort(this.asc);
            } else {
                updatedList = updatedList.sort(this.desc);
            }
            this.setState({
                items: updatedList
            });
        }
        );
    }
    
    filterSearch(event) {
        const value = event.target.value.toLowerCase();
        const filterKeys = this.props.searching.searchKeys;
        let updatedList = this.state.initialItems;
        let newArr = updatedList.filter((item) => {
            return filterKeys.some((key) => {
                return item[key] !== undefined && String(item[key]).toLowerCase().indexOf(value) > -1
            });
        });
        this.setState({
            items: newArr,
            showAllRows: true
        });
    }

    headerItemClick(item, id) {
        const {columns} = this.props;
        let data = this.state.personsTableHeader;
        data.map((headerCell, idx) => {
            if (id === idx) {
                columns[headerCell].active = true;
            } else {
                columns[headerCell].active = false;
            }
            return columns[headerCell];
        });
        if (item.sortable && item.sortingKey) {
            this.sortTable(item.sortingKey);
            this.setState({
                personsTableHeader: data
            });
        }
    }

    handleCurrentPage(type) {
        this.setState((prevState) => {
            return {currentPagenumber: type === 'inc' ? prevState.currentPagenumber + 1 : prevState.currentPagenumber - 1};
        })
    }

    changeCurrentPage(number) {
        this.setState({
            currentPagenumber: number
        })
    }
    
    showAllRows(checked) {
        this.setState({
            showAllRows: checked
        });
    }
    
    render() {
        const {columns, paging, tableStyles, searching} = this.props;
        const {
            currentPagenumber,
            items,
            MyAwesomeTableStyles,
            showAllRows,
            personsTableHeader
        } = this.state;
        const pageCount = (paging && paging.maxRows && paging.maxRows > 0)
            ? Math.ceil(this.state.items.length / paging.maxRows)
            : 0;
        const cellWidth = typeof tableStyles === 'string'
            ? {width: 100 / Object.keys(columns).length + '%'}
            : {width: 'auto'};
        return (
            <div className="limiter" style={MyAwesomeTableStyles}>
                <svg aria-hidden="true" style={{position: 'absolute', width: '0', height: '0', overflow: 'hidden'}} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <defs>
                        <symbol id="icon-triangle-up" viewBox="0 0 20 20">
                            <title>triangle-up</title>
                            <path d="M15 14h-10l5-9 5 9z"></path>
                        </symbol>
                        <symbol id="icon-triangle-down" viewBox="0 0 20 20">
                            <title>triangle-down</title>
                            <path d="M5 6h10l-5 9-5-9z"></path>
                        </symbol>
                        <symbol id="icon-sort" viewBox="0 0 16 28">
                            <title>sort</title>
                            <path d="M16 17c0 0.266-0.109 0.516-0.297 0.703l-7 7c-0.187 0.187-0.438 0.297-0.703 0.297s-0.516-0.109-0.703-0.297l-7-7c-0.187-0.187-0.297-0.438-0.297-0.703 0-0.547 0.453-1 1-1h14c0.547 0 1 0.453 1 1zM16 11c0 0.547-0.453 1-1 1h-14c-0.547 0-1-0.453-1-1 0-0.266 0.109-0.516 0.297-0.703l7-7c0.187-0.187 0.438-0.297 0.703-0.297s0.516 0.109 0.703 0.297l7 7c0.187 0.187 0.297 0.438 0.297 0.703z"></path>
                        </symbol>
                    </defs>
                </svg>
                <div className="container-table100">
                    {searching && searching.active && searching.searchKeys.length &&
                        <div className="search-container">
                            <input className="table-search" type="search" placeholder={searching.searchPlaceholder} onChange={this.filterSearch}/>
                        </div>
                    }
                    <div className="wrap-table100">
                        <div className="table">
                            <div className="row header">
                                {personsTableHeader.map( (key,idx) => {
                                    return (
                                        <InteractiveTableHeaderCell
                                            key={idx}
                                            dataId={idx}
                                            style={cellWidth}
                                            sortingActiveState={false}
                                            headerItem={columns[key]}
                                            sorting={this.state.sorting}
                                            onHeaderItemClick={this.headerItemClick}/>
                                    );
                                })}
                            </div>
                            {!showAllRows && paging && paging.maxRows && paging.maxRows > 0 && pageCount > 1
                            ? 
                                items.slice(currentPagenumber * paging.maxRows, (currentPagenumber * paging.maxRows) + paging.maxRows).map((item, idx) => {
                                    return(
                                    <div className="row" key={idx}>
                                        {Object.keys(columns).map(function (filter, idx) {
                                        return <div className="cell" style={cellWidth} key={idx}>{item[filter]}</div>
                                        })}
                                    </div>
                                    )
                                })
                            :
                            items.map((item, idx) => {
                                return(
                                <div className="row"
                                    key={idx}>
                                    {/* // {...item.events && item.events.map((event) => {
                                    //     return event={...item[event]()}
                                    // })}> */}
                                    {Object.keys(columns).map(function (filter, idx) {
                                    return <div className="cell" key={idx}>{item[filter]}</div>
                                    })}
                                </div>
                                )
                            })}
                        </div>
                        {paging && pageCount > 1
                        && (
                            <InteractiveTablePagination
                                currentPagenumber={currentPagenumber}
                                showAllRows={showAllRows}
                                pageCount={pageCount}
                                paging={this.props.paging}
                                onHandleCurrentPage={this.handleCurrentPage}
                                onChangeCurrentPage={this.changeCurrentPage}
                                onShowAllRows={this.showAllRows} />
                        )}
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        // get Styles
        const {tableStyles} = this.props;
        let selectedTableStyles;
        if (typeof tableStyles === 'string') {
            switch (tableStyles) {
                case 'responsive': selectedTableStyles = require('./assets/styles/ResponsiveTable.css');
                    break;
                case 'flat': selectedTableStyles = require('./assets/styles/FlatTable.css');
                    break;
                default: console.error('Table style theme unknown (styles={' + tableStyles + '})! Please choose one of these : responsive, flat or set your own styles')
            }
        } else {
            selectedTableStyles = {...tableStyles}
        }

        this.setState({
            items: this.props.dataList,
            MyAwesomeTableStyles: selectedTableStyles
        })
    }
  };

  InteractiveTable.propTypes = {
    tableStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    dataList: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.object.isRequired,
    searching: PropTypes.object,
    paging: PropTypes.object
  }