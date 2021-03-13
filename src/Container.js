import { useState, useCallback } from "react";
import { Card } from "./Card";
import update from "immutability-helper";
import "./style.css";
const style = {
  width: 400
};
function Container() {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "(232) 145-2323"
    },
    {
      id: 2,
      text: "(232) 323-2323"
    },
    {
      id: 3,
      text: "(232) 123-2323"
    },
    {
      id: 4,
      text: "(232) 456-2323"
    },
    {
      id: 5,
      text: "(232) 789-2323"
    }
  ]);

  const [phone, setPhone] = useState({ phone: "" });
  const [error, setError] = useState({ error: "" });

  const handleChange = ({ target: { value } }) => {
    setPhone((prevState) => ({
      phone: normalizeInput(value, prevState.phone)
    }));
  };

  const normalizeInput = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, "");
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7)
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
        3,
        6
      )}-${currentValue.slice(6, 10)}`;
    }
  };

  const validateInput = (value) => {
    let error = false;

    if (!value) error = "Required!";
    else if (value.length !== 14)
      error = "Invalid phone format. ex: (000) 000-0000";

    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateInput(phone.phone);

    let newItems = {
      id: cards.length + 1,
      text: phone.phone
    };

    const newArray = cards.slice();
    newArray.unshift(newItems);

    if (!error) {
      setCards(newArray);
      setPhone({ phone: "" });
      /* setCards((prevItems) => [
        ...prevItems,
        {
          id: prevItems.length + 1,
          text: phone.phone
        }
      ]); */
    }

    /* setError({ error }, () => {
      if (!error) {
        setTimeout(() => {
          alert(JSON.stringify(phone, null, 4));
        }, 300);
      }
    }); */
  };

  const handleReset = () => {
    setPhone({ phone: {} });
    setError({ error: "" });
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        })
      );
    },
    [cards]
  );
  const renderCard = (card, index) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
      />
    );
  };
  return (
    <>
      <div style={style}>
        {cards && cards.map((card, i) => renderCard(card, i))}
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-container">
            <p className="label">Phone:</p>
            <input
              className="input"
              type="text"
              name="phone"
              placeholder="(xxx) xxx-xxxx"
              value={phone.phone}
              onChange={handleChange}
            />
            {error && <p className="error">{error.error}</p>}
          </div>
          <div className="btn-container">
            <button className="btn danger" type="button" onClick={handleReset}>
              Reset
            </button>
            <button className="btn primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Container;
