import {createContext} from 'react'

function noop() {}

export const testAddContext = createContext({
  type: "",
  complexity: "",
  question: "",
  answers: [],
  true_answers: [],
});