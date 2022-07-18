import anecdoteService from "../services/anecdotes";

/*const anecdotesAtStart = []
const getId = () => (100000 * Math.random()).toFixed(0)
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const initialState = anecdotesAtStart.map(asObject)*/

export const createAnecdote = (data) => {
  console.log("data new anecdote", data);
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(data);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

/*export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}*/

export const voteAnecdote = (anecdote) => {
  console.log("id", anecdote);
  console.log("contentVOte", anecdote.content);
  return async (dispatch) => {
    const anecdoteToUpdate = { ...anecdote, votes: anecdote.votes + 1 };
    const votedAnecdote = await anecdoteService.update(anecdoteToUpdate);
    dispatch({
      type: "VOTE",
      data: votedAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE":
      console.log("action.data", action.data);
      //const anecdoteToVote = state.find(n => n.id === action.id)
      //console.log('anecdote to vote', anecdoteToVote)
      //const votedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      //console.log('voted anecdote', votedAnecdote)
      return state.map((n) => (n.id !== action.data.id ? n : action.data));
    case "NEW_ANECDOTE":
      console.log("content", action.data);
      //const newAnecdote = asObject(action.content)
      //console.log('newAnecdote', newAnecdote)
      return state.concat(action.data);
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export default reducer;
