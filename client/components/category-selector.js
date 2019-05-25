import React from 'react'
import { Button, Dropdown } from 'semantic-ui-react'


class CategorySelector extends React.Component {
    constructor() {
        super()
        
        this.state = {
            categories: [
                {
                    id: 1,
                    key: 'rent',
                    text: 'rent',
                    value: 'rent'
                },
                {
                    id: 2,
                    key: 'utilities',
                    text: 'utilities',
                    value: 'utilities'
                },
                {
                    id: 3,
                    key: 'food',
                    text: 'food',
                    value: 'food'
                },
                {
                    id: 4,
                    key: 'transportation',
                    text: 'transportation',
                    value: 'transportation'
                }
            ]
        }
    }

    render() {
        return (
            <Button.Group color="teal">
                <Button>Assign a category</Button>
                <Dropdown 
                    className='button icon'
                    floating
                    options={this.state.categories}
                    trigger={<React.Fragment />}
                />

            </Button.Group>
            // <Dropdown text="Assign a category">
            //     <Dropdown.Menu> 
            //     {
            //         this.state.categories.map(cat => {
            //             return <Dropdown.Item key={cat.id} text={cat.name} />
            //         })
            //     }
            //     </Dropdown.Menu>
            // </Dropdown>
        )
    }
}

export default CategorySelector

