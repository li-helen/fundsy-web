import React from 'react'
import _ from 'lodash';
import Dropdown from 'react-toolbox/lib/dropdown';


class CategorySelector extends React.Component {
    constructor() {
        super()
        
        this.state = {
            categories: [
                {
                    id: 1,
                    value: 'rent',
                    label: 'Rent'
                },
                {
                    id: 2,
                    value: 'utilities',
                    label: 'Utilities'
                },
                {
                    id: 3,
                    value: 'food',
                    label: 'Food'
                },
                {
                    id: 4,
                    value: 'transportation',
                    label: 'Transportation'
                }
            ],

            selectedCategory: '',
            dropdownKey: _.uniqueId()
        }
    }

    handleChange = (value) => {
        console.log('VALUE CHANGED! VALUE IS NOW: ', value)
        this.setState({selectedCategory: value})
        this.setState({dropdownKey: _.uniqueId()})
    }

    render() {
        return (
            <Dropdown
                key={this.state.dropdownKey}
                label="Assign a category" 
                auto={false}
                source={this.state.categories}
                onChange={this.handleChange}
                value={this.state.selectedCategory}
            />
        )
    }
}

export default CategorySelector

