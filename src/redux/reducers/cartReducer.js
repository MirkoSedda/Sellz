let initialState = []

/* Method 1 to sync redux with localStorage:
   using the redux persist library...not hard but add dependencies
   that need to be taken care and updated...
   
   Method 2 to sync localStorage with redux
  first save the data in localStorage then here save it in the store...
  No dependencies to update and keep track, looks more robust <3
*/

// load cart items from local storage
if (localStorage.getItem("cart")) {
  initialState = JSON.parse(localStorage.getItem("cart"))
} else {
  initialState = []
}

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload
    default:
      return state
  }
}
