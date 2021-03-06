import React, {Component} from 'react';

import './card.css';

export const CardRecord = ({item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  )
};

export default class CardView extends Component {
  constructor() {
    super();

    this.state = {
      item: null,
    };
  }

  _updateCard() {
    const {itemId, getData, getImageUrl} = this.props;

    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => this.setState({item, image: getImageUrl(item)}));
  }

  componentDidMount() {
    this._updateCard();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this._updateCard();
    }
  }

  render() {
    const {item, image} = this.state;

    if (!item) {
      return <span>Select an item from a list!</span>;
    }

    const {name} = item;

    return (
      <div className="person-details card">
        <img className="person-image" src={image} alt={`Character ${name} appearance`} />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => React.cloneElement(child, {item}))
            }
          </ul>
        </div>
      </div>
    );
  }
}
