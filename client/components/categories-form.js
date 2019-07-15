import React from 'react'
import {Input} from 'react-toolbox/lib/input'
import {Button} from 'react-toolbox/lib/button'

export default class CategoriesForm extends React.Component {
  render() {
    const {userCategories, handleChange, setLabel, editLabel} = this.props
    return (
      <div>
        {userCategories.length &&
          userCategories.map((cat, idx) => {
            return cat.editing ? (
              <div key={cat.id}>
                <Input
                  type="text"
                  value={userCategories[idx].label}
                  onChange={() => handleChange(cat.id)}
                />
                <Button onClick={() => setLabel(cat.id, cat.label)}>
                  Set Category Label
                </Button>
              </div>
            ) : (
              <div key={cat.id}>
                <h4>{cat.label}</h4>
                <Button onClick={() => editLabel(cat.id)}>
                  Edit Category Label
                </Button>
              </div>
            )
          })}
      </div>
    )
  }
}
