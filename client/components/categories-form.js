import React from 'react'
import {Input} from 'react-toolbox/lib/input'
import {Button} from 'react-toolbox/lib/button'
import {FontIcon} from 'react-toolbox/lib/font_icon'

export default class CategoriesForm extends React.Component {
  render() {
    const {
      userCategories,
      handleChange,
      setLabel,
      editLabel,
      deleteLabel
    } = this.props
    return (
      <div>
        {userCategories.length &&
          userCategories.map((cat, idx) => {
            return cat.editing ? (
              <div key={cat.id} className="categoriesListItem">
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
              <div key={cat.id} className="categoriesListItem">
                <h4>{cat.label}</h4>
                <div>
                  <FontIcon onClick={() => editLabel(cat.id)}>edit</FontIcon>
                  <FontIcon onClick={() => deleteLabel(cat.id)}>
                    delete_outline
                  </FontIcon>
                </div>
              </div>
            )
          })}
      </div>
    )
  }
}
