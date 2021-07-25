export default function (state = {}, action) {
  switch (action.type) {
    case "ME":
      return action.payload;
    default:
      return state;
  }
}
