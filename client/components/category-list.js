import React from 'react'

const Categories = (props) => {
    const {showList, categories} = props
    return (
        <div id="list-wrapper">
                <div id="list-header">Select a category</div>
                {
                    showList && <ul>
                        {
                            categories.map(cat => {
                                return <li>{cat}</li>
                            })
                        }
                    </ul>
                }
        </div>
    )
}

export default Categories