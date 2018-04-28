# React-interactive-Table (RiT)
=========

React-interactive-Table (RiT) is a completely customizable React table having some configurable features like search und paging.

## Installation

  `npm install --save react-interactive-table`

## Usage

```jsx
import InteractiveTable from 'react-interactive-table';

export default class myClass extends React.Component {
    ...
    render () {
        const data = [
            {id: 1, firstname: 'Sean', lastname: 'Thomson', mail: 'sean.thomson@rat.com'},
        {id: 2, firstname: 'Dominic', lastname: 'Edmunds', mail: 'dominic.edmunds@rat.com'},
        ...
        ]
        return (
            <InteractiveTable
                tableStyles={'responsive'}
                dataList={data} 
                columns={
                    {
                        id: {
                            alias: 'ID',
                            sortable: true,
                            active: false,
                            sortingKey: 'id'
                        },
                        lastname: {
                            alias: 'Last Name',
                            sortable: true,
                            active: false,
                            sortingKey: 'lastname'
                        },
                        firstname: {
                            alias: 'First Name',
                            sortable: true,
                            active: false,
                            sortingKey: 'firstname'
                        },
                        mail: {
                            alias: 'Email',
                            sortable: true,
                            active: false,
                            sortingKey: 'mail'
                        }
                    }
                }
                searching={{
                    active: true,
                    searchPlaceholder: 'Search...',
                    searchKeys: ['id', 'firstName', 'mail']
                }}
                paging={{
                    maxRows: 5,
                    prevBtn: 'Prev',
                    nextBtn: 'Next',
                    showAll: true,
                    showAllText: 'show all',
                    joinPages: false
                }}
            />
        )
    }
}
```

![Responsive Design](./images/RAT1.png?raw=true "Responsive Design")

![Flat Design](./images/RAT2.png?raw=true "Flat Design") 

![Searching](./images/RAT3.png?raw=true "Searching") 

![Small Des](./images/RAT4.png?raw=true "Responsive Design") 
 
## Props
`tableStyles`: String | object
the string value can be 'responsive' or 'flat'. These are two different styles for the table you can already use.
You can also use your own styles for the table by injecting your object-Style in the compoenent: tableStyles={myStyles}

`dataList`: an array of objects you want to fill your table with

`columns`: an object describing the columns you want to show. You can provide for every column if you want it to be sortable or not and provide the sorting key for that.

    mail: {
        alias: 'Email',
        sortable: true,
        active: false,
        sortingKey: 'mail'
    }

`searching`: you will provide a search field making you able to search for occurences depending on the searching Keys you provide in an array.

    active: true|false,
    searchPlaceholder: 'Search...',
    searchKeys: [searchKey1, searchKey2, ...]

`paging`: you can actiate paging for your table by providing these properties:

    paging={{
        maxRows: 5, // or any numbr you want
        prevBtn: 'Prev', // or any text you want
        nextBtn: 'Next',
        showAll: true|false,
        showAllText: 'show all', // or any text you want
        joinPages: false|true
    }

If you don't want a paging just don't write it in the component or provide a maxRows of 0...

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
