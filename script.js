// select dom elements
const counterContainerEl = document.getElementById("counter-container")
const addCounterEl = document.getElementById("add-counter")
const resetBtnEl = document.getElementById("reset")

// initial state
const initialState = {
    counters: [
      {
        id: 0,
        value: 0,
        increaseBy: 1,
        defaultValue: 0,
      },
    ],
  }

  // action identifiers
const INCREMENT = "increment"
const DECREMENT = "decrement"
const ADD_COUNTER = "addCounter"
const RESET_COUNTER = "resetCounter"

// action creators
const increment = (counter) => {
    // console.log(counter)
    return {
      type: INCREMENT,
      payload: counter,
    }
  }
  const decrement = (counter) => {
    return {
      type: DECREMENT,
      payload: counter,
    }
  }
//Add counter
const addCounter = (counter) => {
    return {
      type: ADD_COUNTER,
      payload: counter,
    }
  }

  //Reset all counters
const resetCounters = () => {
    return {
      type: RESET_COUNTER,
    }
  }

//   create reducer function

function counterReducer (state = initialState, action) {
    if (actin.type === ADD_COUNTER) {
        return {
            ...state,
            counters: [
                ...state.counters,
                {
                    id: state.counters.length + 1,
                    value: action.payload.defaultValue,
                    ...action.payload,
                },
            ],
        }
    }else if (action.type === RESET_COUNTER) {
        return {
          ...state,
          counters: state.counters.map((counter) => ({
            ...counter,
            value: counter.defaultValue,
          })),
        }
      }else if (action.type === INCREMENT) {
        return {
          ...state,
          counters: state.counters.map((counter) =>
            counter.id === action.payload.id
              ? { ...counter, value: counter.value + counter.increaseBy }
              : { ...counter }
          ),
        }
      }else if (action.type === DECREMENT) {
        return {
          ...state,
          counters: state.counters.map((counter) =>
            counter.id === action.payload.id
              ? { ...counter, value: counter.value - counter.increaseBy }
              : { ...counter }
          ),
        }
      }else {
        return state
      }
}

// create store
const store = Redux.createStore(counterReducer)

// button click listeners
addCounterEl.addEventListener("click", () => {
    store.dispatch(
      addCounter({
        defaultValue: Math.floor(Math.random() * 10 + 1), //Randomly picking default value
        increaseBy: Math.floor(Math.random() * 10 + 1), //Randomly picking increase by
      })
    )
  })
  resetBtnEl.addEventListener("click", () => {
    store.dispatch(resetCounters())
  })

