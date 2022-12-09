import { useEffect, useReducer } from "react";
import { useMemoCompare } from "./useMemoCompare";

export enum Status {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "iderrorle",
}

type State<T = undefined, E = undefined> = {
  status: Status;
  data: T;
  error: E;
};

type Action<P> = {
  type: Status;
  payload?: P;
};

type FirestoreQuery = any;

type FirestoreQueryProps = {
  query: FirestoreQuery;
};

// Reducer for hook state and actions
const reducer = <T, E>(_: State<T, E>, action: Action<T | E>) => {
  switch (action.type) {
    case Status.IDLE:
      return { status: action.type, data: undefined, error: undefined };
    case Status.PENDING:
      return { status: action.type, data: undefined, error: undefined };
    case Status.SUCCESS:
      return { status: action.type, data: action.payload, error: undefined };
    case Status.ERROR:
      return { status: action.type, data: undefined, error: action.payload };
    default:
      throw new Error("invalid action");
  }
};

export const useFirestoreQuery = ({ query }: FirestoreQueryProps) => {
  // Our initial state
  // Start with an "idle" status if query is falsy, as that means hook consumer is
  // waiting on required data before creating the query object.
  // Example: useFirestoreQuery(uid && firestore.collection("profiles").doc(uid))
  const initialState: State = {
    status: query ? Status.PENDING : Status.IDLE,
    data: undefined,
    error: undefined,
  };
  // Setup our state and actions
  const [state, dispatch] = useReducer(reducer, initialState);
  // Get cached Firestore query object with useMemoCompare (https://usehooks.com/useMemoCompare)
  // Needed because firestore.collection("profiles").doc(uid) will always being a new object reference
  // causing effect to run -> state change -> rerender -> effect runs -> etc ...
  // This is nicer than requiring hook consumer to always memoize query with useMemo.
  const queryCached = useMemoCompare<FirestoreQuery>({
    next: query,
    compare: (prevQuery) => {
      // Use built-in Firestore isEqual method to determine if "equal"
      return prevQuery && query && query.isEqual(prevQuery);
    },
  });
  useEffect(() => {
    // Return early if query is falsy and reset to "idle" status in case
    // we're coming from "success" or "error" status due to query change.
    if (!queryCached) {
      dispatch({ type: Status.IDLE });
      return;
    }
    dispatch({ type: Status.PENDING });
    // Subscribe to query with onSnapshot
    // Will unsubscribe on cleanup since this returns an unsubscribe function
    return queryCached.onSnapshot(
      (response: any) => {
        // Get data for collection or doc
        const data = response.docs
          ? getCollectionData(response)
          : getDocData(response);
        dispatch({ type: Status.SUCCESS, payload: data });
      },
      (error: any) => {
        dispatch({ type: Status.ERROR, payload: error });
      }
    );
  }, [queryCached]); // Only run effect if queryCached changes
  return state;
};

// Get doc data and merge doc.id
function getDocData(doc: any) {
  return doc.exists === true ? { id: doc.id, ...doc.data() } : null;
}
// Get array of doc data from collection
function getCollectionData(collection: any) {
  return collection.docs.map(getDocData);
}
